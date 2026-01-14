import { Search, Eye, Filter } from "lucide-react";
import Link from "next/link";
import db from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
    const orders = await db.order.findMany({
        include: {
            _count: {
                select: { items: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Ordenes</h1>
                    <p className="text-gray-500">Revisa y gestiona los pedidos de tus clientes.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border px-4 py-2 rounded-lg font-medium text-gray-600 flex items-center gap-2 hover:bg-gray-50">
                        <Filter className="h-4 w-4" />
                        Filtrar
                    </button>
                    <button className="bg-white border px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-50">
                        Exportar
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar orden, cliente..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-white"
                        />
                    </div>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="px-6 py-4">Orden</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900">
                                    #{order.id.slice(-6).toUpperCase()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900">{order.customer}</span>
                                        <span className="text-xs text-gray-500">{order._count.items} items</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    S/ {Number(order.total).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === "COMPLETED" ? "bg-green-100 text-green-800" :
                                        order.status === "PROCESSING" ? "bg-blue-100 text-blue-800" :
                                            order.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                                                "bg-gray-100 text-gray-800"
                                        }`}>
                                        {order.status === "COMPLETED" ? "Completado" :
                                            order.status === "PROCESSING" ? "Procesando" :
                                                order.status === "PENDING" ? "Pendiente" : "Cancelado"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/admin/orders/${order.id}`}
                                        className="inline-flex p-2 text-gray-400 hover:text-primary transition-colors"
                                    >
                                        <Eye className="h-5 w-5" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
