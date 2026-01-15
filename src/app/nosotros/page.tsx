import Image from "next/image";
import { Heart, Star, Users } from "lucide-react";

export default function NosotrosPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <div className="relative h-[400px] w-full">
                <Image
                    src="https://images.unsplash.com/photo-1591946614720-90a587da4a36?q=80&w=2000&auto=format&fit=crop"
                    alt="Nuestro Taller Floral"
                    fill
                    className="object-cover brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white text-center">Nuestra Historia</h1>
                </div>
            </div>

            <div className="container-custom py-16 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">Sobre DetallOsos</span>
                        <h2 className="text-3xl font-bold text-gray-900">Pasión por los detalles que enamoran</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Nacimos en Lima con un sueño simple: transformar sentimientos en detalles tangibles.
                            Lo que comenzó como un pequeño taller de arreglos florales se ha convertido en una boutique de regalos referente en la ciudad,
                            donde cada rosa, cada lazo y cada tarjeta se preparan con dedicación artesanal.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Creemos que no se necesita una fecha especial para sorprender, y que los mejores regalos son aquellos que hablan desde el corazón.
                        </p>
                    </div>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        <Image
                            src="https://images.unsplash.com/photo-1563241527-3004b7be0fee?q=80&w=1000&auto=format&fit=crop"
                            alt="Florista preparando arreglo"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Values */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                            <Heart className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Amor en cada entrega</h3>
                        <p className="text-gray-600">Tratamos cada pedido como si fuera para nuestra propia persona favorita.</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                            <Star className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Excelencia Floral</h3>
                        <p className="text-gray-600">Seleccionamos cada flor manualmente cada mañana para asegurar frescura máxima.</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                            <Users className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Servicio Personal</h3>
                        <p className="text-gray-600">No somos robots. Estamos contigo en WhatsApp para asesorarte en tu sorpresa.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
