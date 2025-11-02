import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#clientes", label: "Clientes" },
  { href: "#precios", label: "Precios" },
  { href: "#contacto", label: "Contacto" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-secondary/80 backdrop-blur-lg border-b border-border" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* --- INICIO DE LA MODIFICACIÓN DEL LOGO --- */}
        <Link to="/" className="flex items-center gap-2">
          {/* Reemplazamos el icono y texto con el video */}
          <video
            // La ruta es directa porque el video está en la carpeta /public
            src="/Animación_de_Logo_Publicitario.mp4"
            autoPlay
            loop
            muted
            playsInline
            // Ajusta la altura (h-12) como necesites
            className="h-12 w-auto"
          >
            {/* Texto alternativo para navegadores que no soportan video */}
            Logo de WebTomic
          </video>
        </Link>
        {/* --- FIN DE LA MODIFICACIÓN DEL LOGO --- */}

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="luxury" className="shadow-gold-glow animate-glow" asChild>
            <a href="#contacto">Agendar Cita</a>
          </Button>
        </nav>

        {/* Navegación Móvil (Sheet) */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[320px] bg-secondary">
            <div className="flex flex-col h-full p-6">
              <Link to="/" className="flex items-center gap-2 mb-8">
                {/* --- INICIO LOGO MÓVIL --- */}
                <video
                  src="/Animación_de_Logo_Publicitario.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-10 w-auto"
                >
                  Logo de WebTomic
                </video>
                {/* --- FIN LOGO MÓVIL --- */}
              </Link>
              <nav className="flex flex-col gap-6 text-lg">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <Button variant="luxury" className="mt-auto" asChild>
                <a href="#contacto">Agendar Cita</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
