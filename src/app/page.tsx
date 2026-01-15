import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, CheckCircle, Clock, CreditCard, Truck, Sparkles, Heart, Gift, Cake, Baby, Box, PartyPopper, ShieldCheck } from "lucide-react";
import db from "@/lib/db";

// Force dynamic rendering to ensure fresh data if we add admin products
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch products from SQLite DB
  let allProducts = [];
  try {
    // @ts-ignore
    allProducts = await db.product.findMany();
  } catch (error) {
    console.error("Failed to fetch products from DB:", error);
    // We can continue with empty products to avoid crashing the whole page
  }

  const products = Array.isArray(allProducts) ? allProducts
    .filter((p: any) => p.isActive !== false)
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8) : [];

  return (
    <div className="flex flex-col min-h-screen" data-refresh="brand-refresh-v2" suppressHydrationWarning>
      {/* Hero Section - Split Screen Redesign */}
      <section className="relative w-full bg-[#FDFBF7] flex items-center overflow-hidden py-12 lg:py-0 lg:h-[700px]" suppressHydrationWarning>
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" suppressHydrationWarning>

          {/* Left Column: Text Content */}
          <div className="z-10 space-y-8 text-left animate-in fade-in slide-in-from-left duration-1000" suppressHydrationWarning>
            <div className="space-v-4" suppressHydrationWarning>
              <span className="inline-block px-4 py-1.5 bg-accent text-primary rounded-full text-sm font-bold tracking-wide uppercase">
                Boutique de Detalles
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                Detalles que <br />
                <span className="text-primary italic">Enamoran</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                Arreglos exclusivos y regalos premium diseñados para hacer de cada ocasión un momento inolvidable. La elegancia y la ternura en un solo lugar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products">
                <button className="w-full sm:w-auto bg-primary hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 group">
                  Explorar Catálogo
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="w-full sm:w-auto bg-white border-2 border-gray-200 hover:border-primary hover:text-primary text-gray-700 font-bold py-4 px-10 rounded-full text-lg transition-all">
                Ver Promociones
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                    <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="User" width={40} height={40} />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium"><span className="text-gray-900 font-bold">+2,000</span> Clientes Felices</p>
            </div>
          </div>

          {/* Right Column: Premium Image */}
          <div className="relative h-[400px] lg:h-full w-full animate-in fade-in slide-in-from-right duration-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 to-transparent rounded-[3rem] lg:rounded-none lg:rounded-l-[3rem] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop"
                alt="Premium Gift Box"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              {/* Floating Badge */}
              <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-4 animate-bounce-slow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Envío hoy mismo</p>
                  <p className="text-sm font-bold text-gray-900">Lima & Providencias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase - Icon Refinement */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">Arreglos para todas las ocasiones</h2>
            <p className="text-gray-500 mt-2">Encuentra el detalle perfecto diseñado para emocionar</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
            {[
              { name: "Exclusivos", href: "/category/exclusivo", icon: Sparkles },
              { name: "Enamorados", href: "/category/enamorados", icon: Heart },
              { name: "Cumpleaños", href: "/category/cumpleanos", icon: Cake },
              { name: "Aniversarios", href: "/category/aniversarios", icon: Gift },
              { name: "Nacimientos", href: "/category/nacimientos", icon: Baby },
              { name: "Box Regalos", href: "/category/box-regalos", icon: Box },
              { name: "Eventos", href: "/category/eventos", icon: PartyPopper },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center gap-4 transition-all"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:border-primary group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                  <cat.icon className="w-8 h-8 md:w-10 md:h-10 text-gray-400 group-hover:text-primary transition-colors stroke-[1.5]" />
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-wider">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brand Selection */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 p-8 md:p-16 space-y-6">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Colección Exclusiva</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Mucho más que un regalo, una <span className="text-primary">experiencia</span> inolvidable
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Combinamos la elegancia de nuestras flores frescas con los detalles más selectos: chocolates premium, peluches suaves y burbujas de celebración. Cada arreglo es una obra de arte diseñada para emocionar.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Calidad Premium
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Diseño Exclusivo
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Entrega Especial
                </div>
              </div>
              <div className="pt-6">
                <Link href="/category/exclusivo" className="inline-block">
                  <button className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl active:scale-95">
                    Descubrir la Colección
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative h-[400px] lg:h-[600px] w-full">
              <Image
                src="/brand/promo-gift.jpg"
                alt="Colección Exclusiva DetallOsos"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Nuestros Favoritos</h2>
            <p className="text-gray-500">Descubre los arreglos más vendidos de la temporada</p>
            {allProducts.length === 0 && (
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mt-4 max-w-md mx-auto">
                No se pudieron cargar productos. (Verifica logs del servidor)
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  image: product.image,
                  category: product.category || "",
                  description: product.description || "",
                  stock: (product as any).stock ?? 10,
                  isActive: (product as any).isActive ?? true
                }}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/products" className="inline-block">
              <button className="text-primary font-semibold hover:underline text-lg">
                Ver todo el catálogo &rarr;
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Features / Value Props - Icon Refresh */}
      <section className="py-20 bg-gray-50 border-t border-border">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 group">
            <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary group-hover:shadow-md transition-all border border-transparent group-hover:border-primary/10">
              <Truck className="h-8 w-8 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Envío Express</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Entregas seguras el mismo día para pedidos hasta las 2PM.</p>
          </div>
          <div className="space-y-4 group">
            <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary group-hover:shadow-md transition-all border border-transparent group-hover:border-primary/10">
              <Sparkles className="h-8 w-8 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Calidad Premium</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Flores frescas y detalles seleccionados a mano por expertos.</p>
          </div>
          <div className="space-y-4 group">
            <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary group-hover:shadow-md transition-all border border-transparent group-hover:border-primary/10">
              <ShieldCheck className="h-8 w-8 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Compra Segura</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Privacidad garantizada y múltiples opciones de pago confiables.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
