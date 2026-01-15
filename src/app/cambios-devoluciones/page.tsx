import { AlertTriangle, Clock, Camera } from "lucide-react";

export default function CambiosPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Cambios y Devoluciones</h1>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8 flex gap-4 items-start">
                    <AlertTriangle className="text-yellow-600 h-6 w-6 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-yellow-800">Importante</h3>
                        <p className="text-yellow-700 text-sm mt-1">
                            Al tratarse de productos perecibles (flores naturales, alimentos), nuestra política de cambios tiene condiciones específicas para garantizar la calidad.
                        </p>
                    </div>
                </div>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Plazo de Reclamo
                        </h2>
                        <p>
                            Cualquier inconformidad con el estado del producto debe ser reportada dentro de las <strong>2 horas posteriores a la recepción</strong>.
                            Pasado este tiempo, se asume la conformidad del servicio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Camera className="h-5 w-5 text-primary" />
                            Procedimiento
                        </h2>
                        <p>
                            Para gestionar un cambio o devolución, por favor siga estos pasos:
                        </p>
                        <ol className="list-decimal pl-5 mt-2 space-y-2">
                            <li>Tome fotografías claras del producto evidenciando el problema.</li>
                            <li>Envíe las fotos y su número de pedido a nuestro WhatsApp (+51 935 638 342).</li>
                            <li>Nuestro equipo de calidad evaluará el caso y responderá en un plazo máximo de 24 horas.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Escenarios de Cambio</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Flores en mal estado:</strong> Si las flores llegan marchitas o dañadas, repondremos el arreglo sin costo adicional.</li>
                            <li><strong>Producto errado:</strong> Si el producto entregado no corresponde al comprado, realizaremos el cambio inmediato.</li>
                            <li><strong>Insumos agotados:</strong> En arreglos florales, ocasionalmente alguna flor específica puede no estar disponible por temporada. Será reemplazada por una de igual o mayor valor manteniendo el diseño. Esto no califica para devolución total.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
