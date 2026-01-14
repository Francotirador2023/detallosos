import db from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Phone, MapPin, Calendar, MessageSquare, CreditCard, ShoppingBag } from "lucide-react";
import OrderStatusManager from "./StatusManager";

interface PageProps {
    params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({ params }: PageProps) {
    const { id } = await params;

    const order = await db.order.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!order) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orden #{order.id.slice(-6).toUpperCase()}</h1>
                    <p className="text-gray-500">Detalles completos del pedido y cliente.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Order Items & Customer Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items Card */}
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <div className="p-4 border-b bg-gray-50 flex items-center gap-2 font-bold">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                            Productos en el Pedido
                        </div>
                        <div className="divide-y">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden relative border">
                                            <img
                                                src={(item.product.image.startsWith("http") || item.product.image.startsWith("/")) ? item.product.image : "/logo.png"}
                                                alt={item.product.name}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">S/ {(Number(item.price) * item.quantity).toFixed(2)}</p>
                                        <p className="text-xs text-gray-500">Unit: S/ {Number(item.price).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-gray-50 border-t flex flex-col items-end space-y-2">
                            <div className="flex justify-between w-full max-w-xs text-gray-500">
                                <span>Subtotal:</span>
                                <span>S/ {Number(order.total).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between w-full max-w-xs text-gray-500">
                                <span>Envío:</span>
                                <span className="text-green-600 font-medium">Por coordinar</span>
                            </div>
                            <div className="flex justify-between w-full max-w-xs text-xl font-bold text-gray-900 pt-2 border-t">
                                <span>Total:</span>
                                <span>S/ {Number(order.total).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer & Delivery Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                            <h2 className="font-bold flex items-center gap-2 border-b pb-2">
                                <User className="h-4 w-4 text-primary" />
                                Información del Cliente
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Nombre</p>
                                    <p className="text-gray-900">{order.customer}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Teléfono</p>
                                    <p className="text-gray-900">{order.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                            <h2 className="font-bold flex items-center gap-2 border-b pb-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                Dirección de Entrega
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Distrito</p>
                                    <p className="text-gray-900">{order.district}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Dirección</p>
                                    <p className="text-gray-900">{order.address}</p>
                                </div>
                                {order.reference && (
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Referencia</p>
                                        <p className="text-gray-900">{order.reference}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Meta & Status Control */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
                        <h2 className="font-bold border-b pb-2">Estado del Pedido</h2>

                        <OrderStatusManager orderId={order.id} currentStatus={order.status} />
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                        <h2 className="font-bold border-b pb-2">Detalles Adicionales</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Fecha Solicitada</p>
                                    <p className="text-sm text-gray-900">{order.deliveryDate || "Inmediato"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MessageSquare className="h-5 w-5 text-gray-400 mt-1" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Dedicatoria</p>
                                    <p className="text-sm text-gray-900 italic">
                                        "{order.giftMessage || "Sin mensaje"}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
