"use client";

import React, { forwardRef, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ReactLenis } from "@studio-freight/lenis/react";
import { Quote } from "lucide-react";

// --- Datos ---
const clients = [
  { name: "Luxe Brands", logo: "LB" },
  { name: "Elite Ventures", logo: "EV" },
  { name: "Premier Corp", logo: "PC" },
  { name: "Prestige Group", logo: "PG" },
];

const testimonials = [
  {
    text: "WebTomic transformó nuestra presencia digital. El resultado superó todas nuestras expectativas.",
    author: "María González",
    company: "Luxe Brands",
  },
  {
    text: "Profesionalismo absoluto. Crearon un sitio que realmente refleja la esencia de nuestra marca premium.",
    author: "Carlos Méndez",
    company: "Elite Ventures",
  },
  {
    text: "La atención al detalle y la calidad del diseño son incomparables. Una inversión que valió la pena.",
    author: "Ana Rodríguez",
    company: "Premier Corp",
  },
];

// --- Componente principal ---
const Clients = forwardRef<HTMLElement, Record<string, never>>((_, ref) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <ReactLenis root>
      <main className="bg-black" ref={ref}>
        {/* SECCIÓN HERO CON FONDO Y GRID */}
        <div className="wrapper">
          <section className="text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              Create Gallery In a Better Way
              <br />
              Using CSS sticky properties <br />
              Scroll down! 👇
            </h1>
          </section>
        </div>

        {/* SECCIÓN PRINCIPAL DE CLIENTES */}
        <section id="clientes" ref={sectionRef} className="py-32 bg-card overflow-hidden text-white">
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
              <p className="text-xl text-muted-foreground font-light">Marcas premium que eligieron WebTomic</p>
            </motion.div>

            {/* Logos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
              {clients.map((client, index) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center justify-center h-32 bg-secondary border border-border rounded-lg group cursor-pointer transition-all duration-300 ease-in-out hover:border-luxury-gold"
                >
                  <div className="text-4xl font-light text-muted-foreground group-hover:text-luxury-gold transition-all duration-300 ease-in-out">
                    {client.logo}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* GALERÍA STICKY (Lenis) */}
            <section className="text-white w-full bg-slate-950">
              <div className="grid grid-cols-12 gap-2">
                {/* Izquierda */}
                <div className="grid gap-2 col-span-4">
                  {[
                    "https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1715432362539-6ab2ab480db2?w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1685904042960-66242a0ac352?w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1719411182379-ffd97c1f7ebf?w=500&auto=format&fit=crop",
                  ].map((src, i) => (
                    <figure key={i} className="w-full">
                      <img
                        src={src}
                        alt={`left-${i}`}
                        className="transition-all duration-300 w-full h-96 object-cover rounded-md"
                      />
                    </figure>
                  ))}
                </div>

                {/* Centro Sticky */}
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
                        alt={`center-${i}`}
                        className="transition-all duration-300 h-full w-full object-cover rounded-md"
                      />
                    </motion.figure>
                  ))}
                </div>

                {/* Derecha */}
                <div className="grid gap-2 col-span-4">
                  {[
                    "https://images.unsplash.com/photo-1719547907790-f661a88302c2?w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=500&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1719554873571-0fd6bf322bb1?w=500&auto=format&fit=crop",
                  ].map((src, i) => (
                    <figure key={i} className="w-full">
                      <img
                        src={src}
                        alt={`right-${i}`}
                        className="transition-all duration-300 w-full h-96 object-cover rounded-md"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </section>

            {/* TESTIMONIOS */}
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-32">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  className="bg-secondary border border-luxury-gold/20 rounded-lg p-8 hover:border-luxury-gold/50 transition-all duration-300 ease-in-out group"
                >
                  <Quote className="h-8 w-8 text-luxury-gold mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="text-foreground/90 mb-6 font-light leading-relaxed">"{testimonial.text}"</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-normal text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="group bg-slate-950 mt-32">
          <h1 className="text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear">
            WebTomic
          </h1>
          <div className="bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"></div>
        </footer>
      </main>
    </ReactLenis>
  );
});

Clients.displayName = "Clients";

export default Clients;
