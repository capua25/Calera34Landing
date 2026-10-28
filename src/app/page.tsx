import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import { Why } from "@/components/sections/Why";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Why />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
