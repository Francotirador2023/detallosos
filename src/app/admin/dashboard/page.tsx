import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Users as UsersIcon } from "lucide-react";
import db from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    // Real Stats
    const completedOrders = await db.order.findMany({
        where: { status: 'COMPLETED' },
        select: { total: true }
    });
    const totalSales = completedOrders.reduce((acc, curr) => acc + Number(curr.total), 0);

    const totalOrders = await db.order.count();

    const uniqueCustomers = await db.order.groupBy({
        by: ['customer'],
        _count: { customer: true }
    });
    const totalCustomers = uniqueCustomers.length;

    const recentOrders = await db.order.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <DollarSign className="h-6 w-6" />
                        </div>
                        <span className="text-green-600 flex items-center text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                            +12% <ArrowUpRight className="h-3 w-3 ml-1" />
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">Ventas Totales</p>
                    <h3 className="text-2xl font-bold text-gray-900">S/ {totalSales.toFixed(2)}</h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                        <span className="text-blue-600 flex items-center text-xs font-bold bg-blue-50 px-2 py-1 rounded-full">
                            +5% <ArrowUpRight className="h-3 w-3 ml-1" />
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">Pedidos Totales</p>
                    <h3 className="text-2xl font-bold text-gray-900">{totalOrders}</h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <UsersIcon className="h-6 w-6" />
                        </div>
                        <span className="text-red-500 flex items-center text-xs font-bold bg-red-50 px-2 py-1 rounded-full">
                            -2% <ArrowDownRight className="h-3 w-3 ml-1" />
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">Clientes Reales</p>
                    <h3 className="text-2xl font-bold text-gray-900">{totalCustomers}</h3>
                </div>
            </div>

            {/* Recent Activity / Simulated Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
                    <h3 className="text-lg font-bold mb-6">Resumen de Ventas (Simulado)</h3>
                    <div className="h-48 flex items-end gap-4">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="flex-1 bg-gray-100 rounded-t-lg relative group">
                                <div
                                    className="bg-primary/80 absolute bottom-0 w-full rounded-t-lg transition-all duration-500 group-hover:bg-primary"
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-400">
                        <span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Últimas Ordenes</h3>
                    <div className="space-y-4">
                        {recentOrders.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No hay ordenes registradas.</p>
                        ) : recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{order.customer}</p>
                                    <p className="text-xs text-gray-500">#{order.id.slice(-6).toUpperCase()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 text-sm">S/ {Number(order.total).toFixed(2)}</p>
                                    <span className={
                                        order.status === "COMPLETED" ? "text-green-600 text-xs" :
                                            order.status === "PENDING" ? "text-orange-500 text-xs" : "text-blue-500 text-xs"
                                    }>
                                        {order.status === "COMPLETED" ? "Completado" :
                                            order.status === "PENDING" ? "Pendiente" :
                                                order.status === "PROCESSING" ? "Procesando" : "Cancelado"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
