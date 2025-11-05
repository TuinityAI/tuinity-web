import { Hero } from "./landing/hero";
import { Features } from "./landing/features";
import { Contact } from "./landing/contact";
import { Faq } from "./landing/faq";
import { ChatButton } from "@/components/chat";
import { Pricing } from "./landing/pricing";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Contact />
      <Faq />
      <ChatButton />
    </>
  );
}
