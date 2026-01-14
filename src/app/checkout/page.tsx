"use client";

import { useCartStore } from "@/lib/store";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Send, MapPin, User, Phone, MessageSquare, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { processCheckout } from "./actions";
import { DISTRICTS } from "@/lib/constants";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCartStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        address: "",
        district: "",
        reference: "",
        deliveryDate: "",
        message: "",
    });

    const selectedDistrictData = DISTRICTS.find(d => d.name === formData.district);
    const shippingCost = selectedDistrictData ? selectedDistrictData.price : 0;
    const orderTotal = total() + shippingCost;

    if (items.length === 0) {
        // ... (Empty cart UI remains same)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhatsAppSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.customerName || !formData.phone || !formData.address || !formData.district) {
            toast.error("Por favor completa los campos obligatorios (Nombre, Teléfono, Distrito y Dirección)");
            return;
        }

        setLoading(true);

        try {
            // 1. Procesar en el servidor (Guardar DB + Email)
            const result = await processCheckout({
                ...formData,
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: total()
            });

            if (!result.success) {
                throw new Error("Error al procesar el pedido");
            }

            // 2. Construir mensaje de WhatsApp
            const WHATSAPP_NUMBER = "51935638342";
            const itemsList = items.map(item => `• ${item.name} (x${item.quantity}) - S/ ${(item.price * item.quantity).toFixed(2)}`).join("\n");
            const totalAmount = total().toFixed(2);

            const text = `*NUEVO PEDIDO - DETALLOSOS*\n` +
                `*ID:* ${result.orderId}\n\n` +
                `*Cliente:* ${formData.customerName}\n` +
                `*Teléfono:* ${formData.phone}\n` +
                `*Distrito:* ${formData.district}\n` +
                `*Dirección:* ${formData.address}\n` +
                `*Referencia:* ${formData.reference || "Ninguna"}\n` +
                `*Fecha de Entrega:* ${formData.deliveryDate || "Lo antes posible"}\n` +
                `*Mensaje:* ${formData.message || "Sin mensaje"}\n\n` +
                `--- *PRODUCTOS* ---\n${itemsList}\n\n` +
                `*Subtotal:* S/ ${total().toFixed(2)}\n` +
                `*Envío:* S/ ${shippingCost.toFixed(2)}\n` +
                `*TOTAL:* S/ ${orderTotal.toFixed(2)}\n\n` +
                `_Pedido registrado correctamente. Por favor, confírmenme para proceder._`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

            // 3. Limpiar carrito y Redirigir
            clearCart();
            window.open(whatsappUrl, "_blank");
            toast.success("¡Pedido registrado! Redirigiendo a WhatsApp...");

            // Redirigir a una página de éxito o al inicio después de un breve delay
            setTimeout(() => {
                router.push("/checkout/success");
            }, 2000);

        } catch (error) {
            console.error(error);
            toast.error("Hubo un problema al procesar tu pedido. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom max-w-5xl">
                <div className="mb-8">
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Volver a la tienda
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mt-4">Finalizar Compra</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <MapPin className="text-primary" />
                                Datos de Entrega
                            </h2>

                            <form className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Nombre Completo *</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            name="customerName"
                                            value={formData.customerName}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="¿Quién recibe?"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Teléfono *</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="Solo números"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Fecha de Entrega</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <input
                                                name="deliveryDate"
                                                type="date"
                                                value={formData.deliveryDate}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Distrito *</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                                            <select
                                                name="district"
                                                value={formData.district}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                                                required
                                            >
                                                <option value="">Selecciona Distrito</option>
                                                {DISTRICTS.map(d => <option key={d.name} value={d.name}>{d.name} (S/ {d.price})</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Dirección Exacta *</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <input
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder="Calle y número"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Referencia (Opcional)</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            name="reference"
                                            value={formData.reference}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="Ej: Portón verde, frente al parque..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Dedicatoria (Opcional)</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                            placeholder="Escribe un mensaje para la tarjeta..."
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Resumen del Pedido</h2>

                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 border">
                                            <Image
                                                src={(item.image.startsWith("http") || item.image.startsWith("/")) ? item.image : "/logo.png"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm text-gray-900">{item.name}</h3>
                                            <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                                            <p className="text-primary font-bold text-sm">S/ {(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2 mb-8">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span>S/ {total().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Envío ({formData.district || "selecciona"})</span>
                                    <span>S/ {shippingCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
                                    <span>Total Estimado</span>
                                    <span>S/ {orderTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleWhatsAppSubmit}
                                disabled={loading}
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    <Send className="h-6 w-6" />
                                )}
                                {loading ? "Procesando..." : "Pedir por WhatsApp"}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4 px-4">
                                Al hacer clic, se abrirá WhatsApp con los detalles de tu pedido para coordinar el pago y la entrega.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
