"use client";

import { useState } from "react";
import { updateOrderStatus } from "../../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function OrderStatusManager({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (newStatus: string) => {
        setLoading(true);
        try {
            await updateOrderStatus(orderId, newStatus);
            toast.success(`Pedido actualizado a: ${newStatus}`);
        } catch (error) {
            toast.error("Error al actualizar el pedido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Estado Actual:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentStatus === "COMPLETED" ? "bg-green-100 text-green-800" :
                    currentStatus === "PROCESSING" ? "bg-blue-100 text-blue-800" :
                        currentStatus === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                    }`}>
                    {currentStatus === "COMPLETED" ? "Completado" :
                        currentStatus === "PROCESSING" ? "En Proceso" :
                            currentStatus === "PENDING" ? "Pendiente" : "Cancelado"}
                </span>
            </div>

            <div className="space-y-2">
                <p className="text-xs text-gray-400 uppercase font-bold">Acciones rápidas</p>
                <div className="grid grid-cols-1 gap-2">
                    <button
                        onClick={() => handleUpdate("PROCESSING")}
                        disabled={loading || currentStatus === "PROCESSING"}
                        className="w-full text-left p-3 border rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium border-blue-100 disabled:opacity-50 flex justify-between items-center"
                    >
                        Marcar como En Proceso
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    </button>
                    <button
                        onClick={() => handleUpdate("COMPLETED")}
                        disabled={loading || currentStatus === "COMPLETED"}
                        className="w-full text-left p-3 border rounded-lg hover:bg-green-50 transition-colors text-sm font-medium border-green-100 disabled:opacity-50 flex justify-between items-center"
                    >
                        Marcar como Entregado
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    </button>
                    <button
                        onClick={() => handleUpdate("CANCELLED")}
                        disabled={loading || currentStatus === "CANCELLED"}
                        className="w-full text-left p-3 border rounded-lg hover:bg-red-50 transition-colors text-sm font-medium border-red-100 disabled:opacity-50 flex justify-between items-center"
                    >
                        Cancelar Pedido
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
