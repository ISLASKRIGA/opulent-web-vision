import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import React, { useRef, useEffect, forwardRef } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- INICIO: IMPORTACIONES Y DEFINICIÓN DEL BANNER DE TEXTO ---
import {
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  wrap,
} from "framer-motion";

interface ScrollingTextBannerProps {
  children: string;
  baseVelocity: number;
  clasname?: string;
  scrollDependent?: boolean;
  delay?: number;
}

const ScrollingTextBanner = forwardRef<HTMLDivElement, ScrollingTextBannerProps>(
  ({ children, baseVelocity = -5, clasname, scrollDependent = false, delay = 0 }, ref) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
      clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    const hasStarted = useRef(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        hasStarted.current = true;
      }, delay);

      return () => clearTimeout(timer);
    }, [delay]);

    useAnimationFrame((t, delta) => {
      if (!hasStarted.current) return;

      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (scrollDependent) {
        if (velocityFactor.get() < 0) {
          directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
          directionFactor.current = 1;
        }
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div ref={ref} className="overflow-hidden whitespace-nowrap flex flex-nowrap">
        <motion.div className="flex whitespace-nowrap gap-10 flex-nowrap" style={{ x }}>
          <span className={cn(`block text-[8vw]`, clasname)}>{children}</span>
          <span className={cn(`block text-[8vw]`, clasname)}>{children}</span>
          <span className={cn(`block text-[8vw]`, clasname)}>{children}</span>
          <span className={cn(`block text-[8vw]`, clasname)}>{children}</span>
        </motion.div>
      </div>
    );
  },
);

ScrollingTextBanner.displayName = "ScrollingTextBanner";
// --- FIN: DEFINICIÓN DEL BANNER DE TEXTO ---

// --- (Definiciones de TestimonialCard y TestimonialAuthor) ---
export interface TestimonialAuthor {
  name: string;
  handle: string;
  imageSrc?: string;
}
export interface TestimonialCardProps {
  text: string;
  author: TestimonialAuthor;
  href?: string;
  className?: string;
}
export const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ text, author, href, className }, ref) => {
    // ... (Contenido del componente TestimonialCard) ...
    const content = (
      <Card
        ref={ref}
        className={cn(
          "w-80 shrink-0 rounded-lg",
          "bg-secondary border border-luxury-gold/20 hover:border-luxury-gold/50 transition-luxury group",
          className,
        )}
      >
        <CardContent className="p-8">
          <p className="mb-6 font-light leading-relaxed text-foreground/90">"{text}"</p>
          <div className="flex items-center gap-3 border-t border-border pt-4">
            <Avatar>
              <AvatarImage src={author.imageSrc} alt={author.name} />
              <AvatarFallback>
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-normal text-foreground">{author.name}</p>
              <p className="text-sm text-muted-foreground">{author.handle}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
    if (href) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      );
    }
    return content;
  },
);
TestimonialCard.displayName = "TestimonialCard";
// --- (Fin de definiciones de Testimonial) ---

const testimonials: Array<{ author: TestimonialAuthor; text: string; href?: string }> = [
  {
    text: "WebTomic transformó nuestra presencia digital. El resultado superó todas nuestras expectativas.",
    author: {
      name: "María González",
      handle: "Luxe Brands",
    },
  },
  {
    text: "Profesionalismo absoluto. Crearon un sitio que realmente refleja la esencia de nuestra marca premium.",
    author: {
      name: "Carlos Méndez",
      handle: "Elite Ventures",
    },
  },
  {
    text: "La atención al detalle y la calidad del diseño son incomparables. Una inversión que valió la pena.",
    author: {
      name: "Ana Rodríguez",
      handle: "Premier Corp",
    },
  },
];

const Clients = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clientes" ref={ref} className="py-32 bg-card">
      <div className="container mx-auto px-6">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
            Clientes que confían en la <span className="text-luxury-gold">excelencia</span>
          </h2>
          <p className="text-xl text-muted-foreground font-light">Marcas que eligieron WebTomic</p>
        </motion.div>

        {/* --- INICIO: BANNER DE TEXTO REEMPLAZANDO LOS LOGOS --- */}
        <div className="mb-24">
          <ScrollingTextBanner baseVelocity={-1} clasname="font-light tracking-tight text-luxury-gold">
            Doble visibilidad. Doble de clientes. Doble de ingresos. Y el doble de tranquilidad •
          </ScrollingTextBanner>
        </div>
        {/* --- FIN: BANNER DE TEXTO --- */}

        {/* Carrusel Sticky de Imágenes */}
        <div className="relative mb-32">
          <div className="grid grid-cols-12 gap-2">
            {/* Columna izquierda */}
            <div className="grid gap-2 col-span-4">
              {[
                "https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1719411182379-ffd97c1f7ebf?w=500&auto=format&fit=crop",
              ].map((src, i) => (
                <motion.figure key={i} className="w-full" whileHover={{ scale: 1.03 }}>
                  <img
                    src={src}
                    alt={`client-${i}`}
                    className="transition-all duration-500 w-full h-96 object-cover rounded-md brightness-90 hover:brightness-110"
                  />
                </motion.figure>
              ))}
            </div>

            {/* Columna central sticky */}
            <div className="sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3">
              {[
                "https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1476180814856-a36609db0493?w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=500&auto=format&fit=crop",
              ].map((src, i) => (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="w-full h-full"
                >
                  <img
                    src={src}
                    alt={`client-center-${i}`}
                    className="transition-all duration-500 h-full w-full object-cover rounded-md brightness-90 hover:brightness-110"
                  />
                </motion.figure>
              ))}
            </div>

            {/* Columna derecha */}
            <div className="grid gap-2 col-span-4">
              {[
                "https://images.unsplash.com/photo-1719547907790-f661a88302c2?w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=500&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1719554873571-0fd6bf322bb1?w=500&auto=format&fit=crop",
              ].map((src, i) => (
                <motion.figure key={i} className="w-full" whileHover={{ scale: 1.03 }}>
                  <img
                    src={src}
                    alt={`client-${i}`}
                    className="transition-all duration-500 w-full h-96 object-cover rounded-md brightness-90 hover:brightness-110"
                  />
                </motion.figure>
              ))}
            </div>
          </div>
        </div>

        {/* Sección de Testimonios (Carrusel) */}
        <div className="mx-auto flex w-full max-w-container flex-col items-center gap-4 text-center sm:gap-16">
          <motion.div
            className="flex flex-col items-center gap-4 px-4 sm:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
              Clientes que confían en la <span className="text-luxury-gold">excelencia</span>
            </h2>
            <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
              Marcas premium que eligieron WebTomic
            </p>
          </motion.div>

          <motion.div
            className="relative flex w-full flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
              <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                {[...Array(4)].map((_, setIndex) =>
                  testimonials.map((testimonial, i) => <TestimonialCard key={`${setIndex}-${i}`} {...testimonial} />),
                )}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-card sm:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-card sm:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
