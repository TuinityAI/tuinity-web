import Image from "next/image";
import { SiOpenai, SiAnthropic, SiGooglegemini, SiMeta } from "react-icons/si";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/animate-ui/components/radix/tooltip";

function XaiIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="196 51 450 493"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="m557.09 211.99 8.31 326.37h66.56l8.32-445.18zM640.28 56.91H538.72L379.35 284.53l50.78 72.52zM201.61 538.36h101.56l50.79-72.52-50.79-72.53zM201.61 211.99l228.52 326.37h101.56L303.17 211.99z" />
    </svg>
  );
}

function QwenIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M23.919 14.545 20.817 9.17l1.47-2.544a.56.56 0 0 0 0-.566l-1.633-2.83a.57.57 0 0 0-.49-.283h-6.207L12.487.402a.57.57 0 0 0-.49-.284H8.732a.56.56 0 0 0-.49.284L5.139 5.775h-2.94a.56.56 0 0 0-.49.284L.077 8.887a.56.56 0 0 0 0 .567L3.18 14.83l-1.47 2.545a.56.56 0 0 0 0 .566l1.634 2.83a.57.57 0 0 0 .49.283h6.205l1.47 2.545a.57.57 0 0 0 .49.284h3.266a.57.57 0 0 0 .49-.284l3.104-5.375h2.94a.57.57 0 0 0 .49-.283l1.634-2.828a.55.55 0 0 0-.004-.568M8.733.686l1.634 2.828-1.634 2.828H21.8L20.164 9.17H7.425L5.63 6.06Zm1.306 19.801-6.205-.002 1.634-2.83h3.265L2.201 6.344h3.267q3.182 5.517 6.367 11.032zm10.124-5.66L18.53 12l-6.532 11.315-1.634-2.83c2.129-3.673 4.25-7.351 6.373-11.028h3.592l3.102 5.374z" />
    </svg>
  );
}

const PROVIDERS = [
  { Icon: SiOpenai, label: "OpenAI" },
  { Icon: SiAnthropic, label: "Anthropic" },
  { Icon: SiGooglegemini, label: "Gemini" },
  { Icon: XaiIcon, label: "Grok" },
  { Icon: SiMeta, label: "Meta" },
  { Icon: QwenIcon, label: "Qwen" },
];

export function Tech() {
  return (
    <section
      id="tech"
      className="relative bg-white pb-10 md:pb-0 w-full md:min-h-[72vh]"
    >
      <div className="relative w-full h-[48svh] md:absolute md:inset-0 md:h-auto">
        <Image
          src="/assets/techdesktop.png"
          alt="Data center"
          fill
          sizes="100vw"
          className="hidden md:block object-cover"
        />
        <Image
          src="/assets/techmovil.png"
          alt="Data center"
          fill
          sizes="100vw"
          className="md:hidden object-cover"
        />
        <p className="top-3 md:top-auto left-4 md:left-8 md:bottom-6 absolute font-light text-white/80 text-xs md:text-sm tracking-wide">
          Google Data Center - Council Bluffs, Iowa
        </p>
      </div>

      <div
        className="relative md:right-14 md:bottom-14 md:absolute flex flex-col bg-white mx-4 md:mx-0 -mt-24 md:mt-0 p-8 md:p-10 pb-14 md:pb-24 md:w-[470px] text-neutral-950"
        style={{
          clipPath: "polygon(2.5rem 0, 100% 0, 100% 100%, 0 100%, 0 2.5rem)",
        }}
      >
        <div className="flex items-center gap-5 text-neutral-800">
          {PROVIDERS.map(({ Icon, label }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <span>
                  <Icon aria-label={label} className="size-5 md:size-6" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-neutral-950 text-white">
                {label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <h2
          className="mt-8 md:mt-10 text-3xl md:text-4xl leading-tight"
          style={{
            fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
            fontWeight: 300,
          }}
        >
          Las mejores tecnologías del mundo, trabajando para tu negocio.
        </h2>

      </div>
    </section>
  );
}
