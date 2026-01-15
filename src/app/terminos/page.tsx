export default function TerminosPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Términos y Condiciones</h1>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introducción</h2>
                        <p>
                            Bienvenido a DetallOsos. Al acceder y utilizar nuestro sitio web, usted acepta los siguientes términos y condiciones.
                            Nos reservamos el derecho de modificar estos términos en cualquier momento.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. Horarios de Entrega</h2>
                        <p>
                            Realizamos entregas de lunes a domingo. Los rangos horarios de entrega son referenciales:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Turno Mañana:</strong> 9:00 AM - 1:00 PM</li>
                            <li><strong>Turno Tarde:</strong> 2:00 PM - 6:00 PM</li>
                            <li><strong>Horario Especial:</strong> Previa coordinación y costo adicional.</li>
                        </ul>
                        <p className="mt-2 text-sm text-gray-500 italic">
                            * En fechas de alta demanda (San Valentín, Día de la Madre), los horarios pueden extenderse.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cobertura de Reparto</h2>
                        <p>
                            Nuestra tarifa de envío varía según el distrito de entrega en Lima Metropolitana.
                            Para envíos a provincias o zonas fuera de cobertura estándar, por favor contáctenos vía WhatsApp antes de realizar la compra.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. Política de Entrega Fallida</h2>
                        <p>
                            Si al llegar a la dirección el destinatario no se encuentra o la dirección es incorrecta:
                        </p>
                        <ol className="list-decimal pl-5 mt-2 space-y-1">
                            <li>El repartidor esperará un máximo de 10 minutos.</li>
                            <li>Intentaremos contactar al cliente comprador para coordinar.</li>
                            <li>Si no hay respuesta, el producto retornará al taller. El cliente deberá pagar un nuevo costo de envío para reprogramar.</li>
                        </ol>
                    </section>
                </div>
            </div>
        </div>
    );
}
