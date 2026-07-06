import { Hero2 } from "./landing/hero2";
import { ChatButton } from "@/components/chat";
import { SoftwareServices } from "./landing/software";
import { Cortex } from "./landing/cortex";
import { Tech } from "./landing/tech";
import { Cta } from "./landing/cta";

export default function Home() {
  return (
    <>
      <Hero2 />
      <SoftwareServices />
      <Cortex />
      <Tech />
      <Cta />
      <ChatButton />
    </>
  );
}
