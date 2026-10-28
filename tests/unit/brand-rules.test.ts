import { globSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const sourceFiles = globSync("src/**/*.{ts,tsx,css}", { cwd: root });
const read = (file: string) => readFileSync(path.join(root, file), "utf8");

const relativeLuminance = (hex: string) => {
  const channels = hex
    .replace("#", "")
    .match(/../g)!
    .map((c) => parseInt(c, 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const contrast = (a: string, b: string) => {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe("brand rules", () => {
  it("finds source files to check", () => {
    expect(sourceFiles.length).toBeGreaterThan(0);
    expect(sourceFiles).toContain(path.join("src", "app", "globals.css"));
  });

  it.each(sourceFiles)("%s never uppercases or pluralizes Odoo", (file) => {
    expect(read(file)).not.toMatch(/ODOO|Odoos/);
  });

  it.each(sourceFiles)("%s has no client directive", (file) => {
    expect(read(file)).not.toMatch(/['"]use client['"]/);
  });

  it.each(sourceFiles)("%s never uses text-transform: uppercase", (file) => {
    expect(read(file)).not.toMatch(/text-transform\s*:\s*uppercase/i);
  });

  it("globals.css defines the brand color tokens", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/--navy:\s*#0F2240;/);
    expect(css).toMatch(/--sky:\s*#1EA0E6;/);
  });

  it("--sky-text meets WCAG AA (4.5:1) on white", () => {
    const match = read("src/app/globals.css").match(/--sky-text:\s*(#[0-9a-fA-F]{6});/);
    expect(match).not.toBeNull();
    expect(contrast(match![1], "#FFFFFF")).toBeGreaterThanOrEqual(4.5);
  });

  it("icon.svg is standalone with literal colors", () => {
    const svg = read("src/app/icon.svg");
    expect(svg).toMatch(/^<svg[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    expect(svg).not.toMatch(/var\(/);
    expect(svg).toContain("#0F2240");
    expect(svg).toContain("#1EA0E6");
  });
});
