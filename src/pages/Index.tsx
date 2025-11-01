import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// --- INICIO DEL CÓDIGO CORREGIDO ---
import React, { useRef, useEffect, forwardRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  wrap, // Import 'wrap' también desde framer-motion
} from "framer-motion"; // Importar desde 'framer-motion'
import { cn } from "@/lib/utils";

interface ScrollingTextBannerProps {
  children: string;
  baseVelocity: number;
  clasname?: string;
  scrollDependent?: boolean;
  delay?: number;
}

// Tu componente de animación
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
// --- FIN DEL CÓDIGO CORREGIDO ---

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* --- COMPONENTE DE ANIMACIÓN INTEGRADO --- */}
      <section className="bg-secondary py-4 border-b border-border">
        <ScrollingTextBanner baseVelocity={-1} clasname="font-light tracking-tight text-luxury-gold">
          Comienza a duplicar tus ventas ahora mismo •
        </ScrollingTextBanner>
      </section>
      {/* --- FIN DE LA INTEGRACIÓN --- */}

      <main>
        <Hero />
        <Clients />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
