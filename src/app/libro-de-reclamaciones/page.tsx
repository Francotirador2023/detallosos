"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitComplaint } from "./actions";
import { toast } from "sonner";

export default function LibroReclamacionesPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const result = await submitComplaint(formData);

        setIsSubmitting(false);

        if (result.success) {
            setIsSuccess(true);
            toast.success("Reclamación enviada correctamente.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            toast.error(result.error || "Hubo un error al enviar la reclamación.");
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 py-20 px-4">
                <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">¡Reclamación Recibida!</h1>
                    <p className="text-gray-600 text-lg">
                        Su mensaje ha sido enviado correctamente al equipo de DetallOsos. Según la normativa vigente, le daremos una respuesta en un plazo no mayor a 15 días hábiles.
                    </p>
                    <div className="pt-8">
                        <Link href="/">
                            <button className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 mx-auto">
                                <ArrowLeft className="w-5 h-5" />
                                Volver al Inicio
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 shadow-inner">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-sm border border-border">
                    <div className="space-y-2 text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-gray-900">Libro de Reclamaciones</h1>
                        <p className="text-gray-500 font-medium tracking-tight uppercase text-xs">Conforme a lo dispuesto en el Código de Protección y Defensa del Consumidor</p>
                    </div>
                    <div className="relative h-20 w-20">
                        <Image src="/libro-reclamaciones.png" alt="Libro de Reclamaciones" fill className="object-contain" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 1. Identificación del Consumidor */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-border space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b">
                            <h2 className="text-lg font-bold text-gray-800">1. Identificación del Consumidor</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nombre Completo *</label>
                                <input name="fullName" type="text" required placeholder="Ej. Juan Pérez" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">DNI / CE *</label>
                                <input name="documentId" type="text" required placeholder="Número de documento" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Correo Electrónico *</label>
                                <input name="email" type="email" required placeholder="correo@ejemplo.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Teléfono / WhatsApp *</label>
                                <input name="phone" type="tel" required placeholder="999 999 999" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Dirección de Domicilio *</label>
                                <input name="address" type="text" required placeholder="Av. Siempre Viva 123, Miraflores, Lima" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* 2. Detalle de la Reclamación */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-border space-y-6">
                        <div className="flex items-center gap-2 pb-2 border-b">
                            <h2 className="text-lg font-bold text-gray-800">2. Detalle de la Reclamación</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Tipo *</label>
                                <select name="type" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                    <option value="reclamo">Reclamo (Disconformidad relacionada a los productos)</option>
                                    <option value="queja">Queja (Disconformidad respecto a la atención)</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">N° Pedido / Referencia</label>
                                <input name="orderNumber" type="text" placeholder="Ej. #1234 (Opcional)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Detalle del bien contratado *</label>
                                <textarea name="contractedDetail" required rows={2} placeholder="Describa el producto o servicio adquirido" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"></textarea>
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Detalle de la queja o reclamo *</label>
                                <textarea name="claimDetail" required rows={4} placeholder="Brinde más información sobre lo sucedido" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"></textarea>
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Pedido o Solicitud del Consumidor</label>
                                <textarea name="customerRequest" rows={2} placeholder="¿Qué solución espera recibir?" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Info Alert */}
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4">
                        <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800 leading-relaxed">
                            <p className="font-bold mb-1">Nota importante:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li><strong>RECLAMO:</strong> Disconformidad relacionada a los productos o servicios.</li>
                                <li><strong>QUEJA:</strong> Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público.</li>
                                <li>La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] flex items-center gap-3 active:scale-95"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Enviar Reclamación
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center pt-8 pb-12">
                    <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors font-medium flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        </div>
    );
}
