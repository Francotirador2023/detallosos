"use client";

import { useCartStore } from "@/lib/store";
import { X, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CartSheet() {
    const { isOpen, toggleCart, items, removeItem, removeItemOne, addItem, total } = useCartStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Tu Carrito</h2>
                        <p className="text-xs text-gray-500 mt-1">{items.length} productos agregados</p>
                    </div>
                    <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="text-5xl opacity-20">🛒</div>
                            <p className="text-gray-400 font-medium">Tu carrito está vacío</p>
                            <button
                                onClick={toggleCart}
                                className="text-primary font-bold hover:bg-primary hover:text-white px-6 py-2 rounded-full border border-primary transition-all"
                            >
                                Seguir comprando
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative h-20 w-20 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group-hover:border-primary/30 transition-colors">
                                    <Image
                                        src={(item.image?.startsWith("http") || item.image?.startsWith("/")) ? item.image : "/logo.png"}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <p className="text-primary font-bold text-sm mt-1">S/ {item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-autp">
                                        <div className="flex items-center gap-3 bg-gray-50 border rounded-full px-2 py-1">
                                            <button
                                                onClick={() => removeItemOne(item.id)}
                                                className="p-1 text-gray-400 hover:text-primary transition-colors disabled:opacity-30"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center text-gray-700">{item.quantity}</span>
                                            <button
                                                onClick={() => addItem(item)}
                                                className="p-1 text-gray-400 hover:text-primary transition-colors"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs font-bold text-gray-400">S/ {(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t p-6 bg-gray-50 space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-500 text-sm">
                                <span>Subtotal</span>
                                <span>S/ {total().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Envío</span>
                                <span>Calculado al pagar</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
                                <span>Total</span>
                                <span>S/ {total().toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            onClick={toggleCart}
                            className="block w-full text-center bg-primary text-white py-4 rounded-xl font-bold hover:bg-red-600 transition shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
                        >
                            Finalizar Compra
                        </Link>
                        <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest">
                            Pago seguro por transferencia o Yape
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
