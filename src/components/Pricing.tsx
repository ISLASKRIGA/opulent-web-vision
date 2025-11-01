import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Pricing from "@/components/Pricing"; // La importación sigue funcionando
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// --- DATOS DE EJEMPLO PARA LOS PLANES ---
const pricingPlans = [
  {
    name: "Essential",
    price: "1200",
    yearlyPrice: "1000",
    period: "month",
    description: "Perfecto para individuos y pequeños negocios.",
    features: ["Diseño Web Personalizado", "Optimización SEO Básica", "3 Páginas", "Soporte por Email"],
    buttonText: "Comenzar Proyecto",
    href: "/contact",
  },
  {
    name: "Premium",
    price: "2500",
    yearlyPrice: "2200",
    period: "month",
    description: "Ideal para negocios en crecimiento que buscan destacar.",
    features: [
      "Todo en Essential",
      "Diseño UI/UX Avanzado",
      "Hasta 10 Páginas",
      "CMS Integrado",
      "Soporte Prioritario",
    ],
    buttonText: "Elegir Premium",
    href: "/contact",
    isPopular: true,
  },
  {
    name: "Opulent",
    price: "5000",
    yearlyPrice: "4500",
    period: "month",
    description: "La solución completa para marcas de lujo y e-commerce.",
    features: [
      "Todo en Premium",
      "Plataforma E-commerce",
      "Animaciones Avanzadas",
      "Integraciones API",
      "Soporte 24/7",
    ],
    buttonText: "Contacto Ventas",
    href: "/contact",
  },
];
// --- FIN DE LOS DATOS ---

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Clients />
        {/* Pasando los 'plans' al componente de Precios */}
        <Pricing
          plans={pricingPlans}
          title="Precios Simples y Transparentes"
          description="Elige el plan que se alinee con tu visión de lujo. Todos los planes incluyen nuestro soporte de élite."
        />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
