export default function PrivacidadPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Política de Privacidad</h1>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <section>
                        <p>
                            En DetallOsos, valoramos y respetamos su privacidad. Esta política describe cómo recopilamos, usamos y protegemos su información personal,
                            en cumplimiento con la Ley N° 29733, Ley de Protección de Datos Personales de Perú.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Información que Recopilamos</h2>
                        <p>
                            Solo solicitamos la información estrictamente necesaria para procesar su pedido:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Nombre y apellidos del comprador y destinatario.</li>
                            <li>Dirección de entrega y referencias.</li>
                            <li>Números de teléfono para coordinación de delivery.</li>
                            <li>Correo electrónico para envío de confirmaciones.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. Uso de la Información</h2>
                        <p>
                            Sus datos son utilizados exclusivamente para:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Gestionar la entrega de sus productos.</li>
                            <li>Comunicarnos con usted en caso de incidencias.</li>
                            <li>Enviar promociones exclusivas (solo si aceptó suscribirse, puede darse de baja cuando desee).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. Seguridad de Datos</h2>
                        <p>
                            No compartimos ni vendemos su información a terceros. Nuestros pagos son procesados por pasarelas seguras y no almacenamos datos de tarjetas de crédito en nuestros servidores.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. Derechos ARCO</h2>
                        <p>
                            Como titular de sus datos personales, usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de su información.
                            Para ejercer estos derechos, envíe un correo a hola@detallosos.pe.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
