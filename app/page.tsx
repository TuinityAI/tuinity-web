import { Navbar } from "@/components/navbar";
import { Hero } from "./landing/hero";
import { Features } from "./landing/features";
import { Contact } from "./landing/contact";
import { Faq } from "./landing/faq";
import { ChatButton } from "@/components/chat";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Contact />
      <Faq />
      <ChatButton />
    </>
  );
}
