import { ChevronDown } from "lucide-react";

export default function FAQPage() {
    const faqs = [
        {
            q: "¿Hacen envíos el mismo día?",
            a: "Sí, aceptamos pedidos 'Express' para el mismo día si se realizan antes de las 2:00 PM. Pasada esa hora, se programan para el día siguiente."
        },
        {
            q: "¿Puedo personalizar los colores de las rosas?",
            a: "¡Por supuesto! En la mayoría de nuestros arreglos puedes elegir el color de rosas (rojo, blanco, rosado, lila) sujeto a disponibilidad. Escríbenos al WhatsApp para confirmar stock."
        },
        {
            q: "¿Qué medios de pago aceptan?",
            a: "Aceptamos todas las tarjetas de crédito/débito (Visa, Mastercard), transferencias bancarias (BCP, Interbank, BBVA) y billeteras digitales como Yape y Plin."
        },
        {
            q: "¿El envío está incluido en el precio?",
            a: "El costo de envío es adicional y se calcula según el distrito de entrega. Tenemos tarifas planas para la mayoría de distritos de Lima Moderna."
        },
        {
            q: "¿Envían foto antes de despachar?",
            a: "Sí, esa es nuestra garantía de tranquilidad. Te enviaremos una foto de tu arreglo terminado por WhatsApp antes de que salga a ruta."
        },
        {
            q: "¿Es seguro comprar en la web?",
            a: "Totalmente. Nuestra web cuenta con certificado de seguridad SSL (candado verde) y procesamos los pagos con proveedores certificados."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="container-custom max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h1>
                    <p className="text-gray-600">Resolvemos tus dudas al instante</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-gray-900 text-lg mb-2 flex justify-between items-center group cursor-default">
                                {faq.q}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
