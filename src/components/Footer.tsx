import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">DetallOsos</h2>
                    <p className="text-sm leading-relaxed">
                        Creando momentos inolvidables a través de arreglos florales exclusivos y regalos premium. Calidad y elegancia en cada detalle.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
                        <a href="https://wa.me/51935638342" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Phone className="h-5 w-5" /></a>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold text-lg">Categorías</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/category/enamorados" className="hover:text-white transition-colors">Enamorados</Link></li>
                        <li><Link href="/category/cumpleanos" className="hover:text-white transition-colors">Cumpleaños</Link></li>
                        <li><Link href="/category/aniversarios" className="hover:text-white transition-colors">Aniversarios</Link></li>
                        <li><Link href="/category/nacimientos" className="hover:text-white transition-colors">Nacimientos</Link></li>
                        <li><Link href="/category/box-regalos" className="hover:text-white transition-colors">Box Regalos</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold text-lg">Ayuda</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/rastreo" className="hover:text-white transition-colors">Rastrea tu Pedido</Link></li>
                        <li><Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
                        <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                        <li><Link href="/cambios-devoluciones" className="hover:text-white transition-colors">Políticas de Cambio</Link></li>
                        <li><Link href="/nosotros" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                        <li><Link href="/preguntas-frecuentes" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold text-lg">Contáctanos</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>Av. Principal 123, Miraflores<br />Lima, Perú</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <a href="https://wa.me/51935638342" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>+51 935 638 342</span>
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>hola@detallosos.pe</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container-custom mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-6">
                <p>&copy; {new Date().getFullYear()} DetallOsos. Todos los derechos reservados. Diseñado con ❤️ para ti.</p>

                {/* Payment Methods & Complaints Book */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-4 opacity-50 grayscale hover:opacity-100 transition-opacity">
                        <span className="font-bold border border-gray-700 px-2 py-0.5 rounded uppercase tracking-tighter">Visa</span>
                        <span className="font-bold border border-gray-700 px-2 py-0.5 rounded uppercase tracking-tighter">Mastercard</span>
                        <span className="font-bold border border-gray-700 px-2 py-0.5 rounded uppercase tracking-tighter">Yape</span>
                        <span className="font-bold border border-gray-700 px-2 py-0.5 rounded uppercase tracking-tighter">Plin</span>
                    </div>

                    <Link
                        href="/libro-de-reclamaciones"
                        className="group flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                    >
                        <div className="relative h-12 w-12 transform group-hover:scale-110 transition-transform">
                            <Image
                                src="/libro-reclamaciones.png"
                                alt="Libro de Reclamaciones Perú"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter group-hover:text-primary">Libro de Reclamaciones</span>
                    </Link>
                </div>

                <Link href="/admin/products" className="hover:text-gray-300 transition-colors">Admin Access</Link>
            </div>
        </footer>
    );
}
