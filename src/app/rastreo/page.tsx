'use client';

import { useState } from 'react';
import { Search, Package, MapPin, Truck, CheckCircle, Clock } from 'lucide-react';
import { getOrderStatus } from './actions';
import { toast } from 'sonner';

export default function RastreoPage() {
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<any>(null);
    const [searched, setSearched] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        setLoading(true);
        setSearched(false);
        setOrder(null);

        try {
            const result = await getOrderStatus(orderId.trim());
            if (result.success) {
                setOrder(result.order);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
            setSearched(true);
        }
    };

    const steps = [
        { status: 'PENDING', label: 'Recibido', icon: Clock, desc: 'Esperando confirmación' },
        { status: 'PROCESSING', label: 'En Preparación', icon: Package, desc: 'Estamos armando tu detalle' },
        { status: 'SHIPPED', label: 'En Ruta', icon: Truck, desc: 'Repartidor en camino' },
        { status: 'DELIVERED', label: 'Entregado', icon: CheckCircle, desc: '¡Disfrútalo!' }
    ];

    const currentStepIndex = order ? steps.findIndex(s => s.status === order.status) : -1;
    // Map database implementation status to visual steps fallback if needed
    // Assuming status are: PENDING, PROCESSING, SHIPPED, COMPLETED/DELIVERED
    // If database uses "COMPLETED" instead of "DELIVERED", map it.

    // Normalize status for UI
    const getStatusIndex = (status: string) => {
        if (status === 'COMPLETED') return 3;
        const index = steps.findIndex(s => s.status === status);
        return index === -1 ? 0 : index;
    };

    const activeIndex = order ? getStatusIndex(order.status) : -1;

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container-custom max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Rastrea tu Pedido</h1>
                    <p className="text-gray-600">Ingresa tu código de orden para ver el estado en tiempo real.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
                    <form onSubmit={handleSubmit} className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Ej: cm5..."
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-70"
                        >
                            {loading ? 'Buscando...' : 'Rastrear'}
                        </button>
                    </form>
                </div>

                {searched && !order && (
                    <div className="text-center p-8 text-gray-500 animate-in fade-in">
                        <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <p>No encontramos un pedido con ese código.</p>
                    </div>
                )}

                {order && (
                    <div className="bg-white p-8 rounded-2xl shadow-lg animate-in slide-in-from-bottom-5 duration-500">
                        <div className="flex justify-between items-start mb-8 border-b pb-6">
                            <div>
                                <p className="text-sm text-gray-500">Orden #{order.id.slice(-6)}</p>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">Hola, {order.customer}</h3>
                            </div>
                            <div className="text-right">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'DELIVERED' || order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-700'
                                    }`}>
                                    {order.status === 'COMPLETED' ? 'ENTREGADO' : order.status}
                                </span>
                            </div>
                        </div>

                        {/* Tracker Timeline via CSS/JS logic based on activeIndex */}
                        <div className="relative">
                            {/* Vertical Line for Mobile / Horizontal for Desktop could be better, sticking to vertical list for simplicity and robustness */}
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:via-gray-200 before:to-gray-50 before:-z-10">
                                {steps.map((step, i) => {
                                    const isCompleted = i <= activeIndex;
                                    const isCurrent = i === activeIndex;

                                    return (
                                        <div key={step.status} className={`relative flex items-center md:items-start md:justify-between gap-6 md:gap-0 md:flex-col md:text-center group transition-all duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                                            {/* Icon Node */}
                                            <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 md:mx-auto
                                                ${isCompleted ? 'bg-primary border-primary text-white shadow-lg scale-110' : 'bg-white border-gray-200 text-gray-400'}
                                            `}>
                                                <step.icon className="h-5 w-5" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 md:mt-4 md:w-full">
                                                <h4 className={`font-bold text-lg ${isCurrent ? 'text-primary' : 'text-gray-900'}`}>{step.label}</h4>
                                                <p className="text-sm text-gray-500">{step.desc}</p>
                                                {isCurrent && step.status === 'SHIPPED' && (
                                                    <div className="mt-2 text-xs font-bold text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded animate-pulse">
                                                        Llegando pronto
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {order.deliveryDate && (
                            <div className="mt-8 pt-6 border-t flex items-center gap-3 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>Fecha estimada: <strong>{order.deliveryDate}</strong></span>
                            </div>
                        )}
                        {order.district && (
                            <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>Destino: <strong>{order.district}</strong></span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
