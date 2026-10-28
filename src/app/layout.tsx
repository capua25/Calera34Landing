import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calera34 Labs",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
