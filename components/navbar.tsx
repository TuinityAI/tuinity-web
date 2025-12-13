import "./navbar.css";
import SliderElementArea from "./animations/slider-element";
import { Brand } from "./brand";
import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { media } from "./footer";

const sections = [
  { name: "Soluciones", href: "#products" },
  { name: "Testimonios", href: "#testimonials" },
  { name: "Contacto", href: "#contact" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  return (
    <header className="top-0 z-50 fixed w-full h-0">
      <nav
        id="navbar"
        className="relative flex justify-between items-center shadow-md mx-auto px-6 py-4 rounded-[0_0_10px_10px] max-w-7xl"
      >
        <div className="flex items-center">
          <Brand />
        </div>
        <div className="md:hidden flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-2xl">Navegación</SheetTitle>
                <SheetDescription>
                  Selecciona una sección para navegar
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col p-2">
                {sections.map((section) => (
                  <SheetClose asChild key={section.name}>
                    <Link
                      href={section.href}
                      className="p-4 border-b w-full font-glitz text-lg cursor-pointer"
                    >
                      {section.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <SheetFooter>
                <div className="flex flex-col flex-wrap w-full">
                  <div className="flex mx-auto mb-7">
                    {media.map((item) => (
                      <div key={item.label} className="mx-4" title={item.label}>
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={item.label}
                        >
                          {item.icon}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <ThemeToggle />
                  <SheetClose asChild>
                    <Link className="w-full" href="#contact">
                      <Button className="w-full">Agendar</Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <SliderElementArea fallback="hide">
            {sections.map((section) => (
              <Link
                key={section.name}
                href={section.href}
                className="px-4 duration-400 cursor-pointer"
              >
                {section.name}
              </Link>
            ))}
          </SliderElementArea>
          <ThemeToggle />
          <Link href="#contact">
            <Button>Agendar</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
