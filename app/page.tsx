import { Hero } from "./landing/hero";
import { Solutions } from "./landing/solutions";
import { Contact } from "./landing/contact";
import { Faq } from "./landing/faq";
import { ChatButton } from "@/components/chat";
import { Pricing } from "./landing/pricing";
import { Comparison } from "./landing/comparison"

export default function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <Comparison />
      <Pricing />
      <Contact />
      <Faq />
      <ChatButton />
    </>
  );
}
