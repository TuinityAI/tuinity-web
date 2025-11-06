import { Hero } from "./landing/hero";
import { Solutions } from "./landing/solutions";
import { Contact } from "./landing/contact";
import { Faq } from "./landing/faq";
import { ChatButton } from "@/components/chat";
import { Pricing } from "./landing/pricing";
import { Comparison } from "./landing/comparison";
import ClientsSection from "./landing/clients-section";
import { Playground } from "./landing/playground";

export default function Home() {
  return (
    <>
      <Hero />
      <Playground />
      <Comparison />
      <Pricing />
      <ClientsSection />
      <Contact />
      <Faq />
      <ChatButton />
    </>
  );
}
