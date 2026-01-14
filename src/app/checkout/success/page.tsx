import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowRight, Phone } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center space-y-8 animate-in zoom-in duration-500">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce-slow">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-extrabold text-gray-900">¡Pedido Enviado!</h1>
                    <p className="text-gray-600">
                        Tu pedido ha sido registrado correctamente y se ha abierto WhatsApp para coordinar el pago.
                    </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                        ¿Qué sigue ahora?
                    </h2>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">1</span>
                            Finaliza el envío del mensaje en WhatsApp.
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">2</span>
                            Te confirmaremos el costo total y métodos de pago.
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">3</span>
                            ¡Prepararemos tu regalo con mucho amor!
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <Link href="/">
                        <button className="w-full bg-primary hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                            Volver al Inicio
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </Link>
                    <a
                        href="https://wa.me/51935638342"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-bold hover:underline flex items-center justify-center gap-2 text-sm"
                    >
                        <Phone className="h-4 w-4" />
                        ¿Necesitas ayuda? Contáctanos
                    </a>
                </div>
            </div>
        </div>
    );
}
