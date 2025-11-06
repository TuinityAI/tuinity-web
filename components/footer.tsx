import Link from "next/link";
import * as motion from "motion/react-client";
import { SiWhatsapp, SiGithub, SiInstagram } from "react-icons/si";

// TODO: Fix icons to standard, not AI generated
const media = [
  {
    href: "https://wa.me/50768497142",
    label: "WhatsApp",
    icon: <SiWhatsapp className="size-6" />,
  },
  {
    href: "https://github.com/TuinityAI",
    label: "GitHub",
    icon: <SiGithub className="size-6" />,
  },
  {
    href: "https://instagram.com/tuinity",
    label: "Instagram",
    icon: <SiInstagram className="size-6" />,
  },
];

export function Footer() {
  return (
    <footer className="relative flex flex-col justify-center items-center mt-20 border-t h-50 overflow-hidden">
      <ul className="flex mb-6">
        {media.map((item) => (
          <li key={item.label} className="mx-4" title={item.label}>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={item.label}
            >
              {item.icon}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mx-auto text-muted-foreground text-center text-sm container">
        © 2025 Tuinity. Todos los derechos reservados.
      </div>
      <motion.span
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="bottom-2 -z-10 absolute bg-clip-text bg-linear-to-t from-transparent to-foreground opacity-10 font-glitz text-9xl text-clip whitespace-nowrap select-none"
      >
        Tuinity IA
      </motion.span>
    </footer>
  );
}
