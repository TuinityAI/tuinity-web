import Link from "next/link";

// TODO: Fix icons to standard, not AI generated
const media = [
  {
    href: "https://wa.me/50768497142",
    label: "WhatsApp",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06.25C6.06.25.73 5.59.73 11.59c0 2.03.53 4.01 1.54 5.76L.25 23.75l6.66-1.74a11.5 11.5 0 0 0 5.15 1.22h.02c6 0 11.33-4.34 11.33-10.34 0-2.76-1.08-5.36-3.03-7.23zM12.06 20.5h-.01a9.22 9.22 0 0 1-4.71-1.28l-.34-.2-3.95 1.03 1.05-3.85-.22-.36a9.15 9.15 0 0 1-1.4-4.66c0-5.03 4.1-9.12 9.15-9.12 2.44 0 4.74.95 6.46 2.68a9.06 9.06 0 0 1 2.68 6.44c0 5.03-4.1 9.12-9.15 9.12zm5.02-6.86c-.27-.14-1.6-.79-1.85-.88-.25-.1-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-.68-1.26-.57-1.48.11-.22.25-.27.43-.41.18-.14.24-.25.36-.42.12-.18.06-.33-.03-.47-.09-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16 0-.34-.01-.52-.01s-.48.07-.73.33c-.25.27-.96.94-.96 2.3s.98 2.67 1.12 2.86c.14.18 1.93 2.94 4.67 4.12 2.74 1.18 2.74.79 2.74.79" />
      </svg>
    ),
  },
  {
    href: "https://github.com/TuinityAI",
    label: "GitHub",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com/tuinity",
    label: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11zm0 1.5a4 4 0 1 0 0 8a4 4 0 0 0 0-8zm5.25-.88a1.12 1.12 0 1 1 0 2.24a1.12 1.12 0 0 1 0-2.24z" />
      </svg>
    ),
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
              className="text-muted-foreground hover:text-foreground scale-110 transition-colors"
              aria-label={item.label}
            >
              {item.icon}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mx-auto text-muted-foreground text-center container">
        © 2025 Tuinity. Todos los derechos reservados.
      </div>
      <span className="bottom-2 absolute bg-clip-text bg-linear-to-t from-transparent to-foreground opacity-10 font-glitz text-9xl text-clip select-none">
        Tuinity AI
      </span>
    </footer>
  );
}
