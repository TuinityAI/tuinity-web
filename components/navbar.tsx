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
} from "./ui/sheet";
import { Menu } from "lucide-react";

const sections = [
  { name: "Productos", href: "#products" },
  { name: "Opciones", href: "#pricing" },
  { name: "Contacto", href: "#contact" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  return (
    <header className="top-0 z-50 sticky h-0">
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
                  <Link
                    key={section.name}
                    href={section.href}
                    className="p-4 border-b w-full font-glitz text-lg cursor-pointer"
                  >
                    {section.name}
                  </Link>
                ))}
              </div>
              <SheetFooter>
                <div className="flex gap-2">
                  <ThemeToggle />
                  <Link className="grow" href="#contact">
                    <Button>Agendar</Button>
                  </Link>
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
