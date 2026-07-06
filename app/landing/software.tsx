import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/animate-ui/components/radix/tooltip";
import { PRODUCTS } from "@/app/productos/data";

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="rotate-135"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12h6m3 0h1.5m3 0h.5" />
      <path d="M5 12l4 4" />
      <path d="M5 12l4 -4" />
    </svg>
  );
}

export function SoftwareServices() {
  return (
    <section
      id="products"
      className="bg-white px-4 md:px-8 pt-4 md:pt-8 pb-6 md:pb-8 text-neutral-950"
    >
      <div className="mx-auto max-w-screen-2xl">
        <p className="text-base md:text-lg">Nuestro Software & Servicios</p>
        <div className="mt-4 md:mt-6 border-t border-neutral-200">
          {PRODUCTS.map((item) => (
            <Link
              key={item.name}
              href={`/productos/${item.slug}`}
              className="group relative block py-8 md:py-12 border-b border-neutral-200 w-full cursor-pointer"
            >
              <span className="top-8 md:top-10 right-2 absolute text-neutral-950 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                <ArrowIcon />
              </span>
              <h3
                className="pr-14 text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none"
                style={{
                  fontFamily: 'var(--font-grift), "Montserrat", sans-serif',
                  fontWeight: 300,
                }}
              >
                {item.name}
              </h3>
              <p className="mt-4 md:mt-5 pr-2 md:pr-52 text-sm md:text-base">
                {item.description}
              </p>
              {item.icons && (
                <span className="flex items-center gap-4 mt-6 md:mt-0 md:right-2 md:bottom-8 md:absolute text-neutral-500">
                  {item.icons.map(({ Icon, label }) => (
                    <Tooltip key={label}>
                      <TooltipTrigger asChild>
                        <span>
                          <Icon className="size-5 md:size-6" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="bg-neutral-950 text-white">
                        {label}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
