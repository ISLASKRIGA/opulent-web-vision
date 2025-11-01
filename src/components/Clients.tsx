import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"; // Importar

const clients = [
  { name: "Luxe Brands", logo: "LB" },
  { name: "Elite Ventures", logo: "EV" },
  { name: "Premier Corp", logo: "PC" },
  { name: "Prestige Group", logo: "PG" },
];

// Nuevo formato de datos para los testimonios
const testimonials: Array<{ author: TestimonialAuthor; text: string; href?: string }> = [
  {
    text: "WebTomic transformó nuestra presencia digital. El resultado superó todas nuestras expectativas.",
    author: {
      name: "María González",
      handle: "Luxe Brands",
      // imageSrc: "URL_DE_LA_IMAGEN_AQUI" (opcional)
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
    <section id="clientes" ref={ref} className="py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Logos Grid (sin cambios) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center justify-center h-32 bg-secondary border border-border rounded-lg group cursor-pointer transition-luxury hover:border-luxury-gold"
            >
              <div className="text-4xl font-light text-muted-foreground group-hover:text-luxury-gold transition-luxury">
                {client.logo}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Galería Sticky (sin cambios) */}
        <div className="relative mb-32">
          {/* ... (el código de la galería de 3 columnas va aquí) ... */}
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

        {/* --- INICIO DE LA NUEVA SECCIÓN DE TESTIMONIOS --- */}
        <div className="mx-auto flex w-full max-w-container flex-col items-center gap-4 text-center sm:gap-16">
          <motion.div
            className="flex flex-col items-center gap-4 px-4 sm:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            transition={{ duration: 0.8, delay: 0.4 }}
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
        {/* --- FIN DE LA NUEVA SECCIÓN DE TESTIMONIOS --- */}
      </div>
    </section>
  );
};

export default Clients;
