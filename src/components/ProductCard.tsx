"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore, Product } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    // Prevent link navigation when clicking specific action buttons
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.stock <= 0) {
            toast.error("Producto agotado");
            return;
        }
        addItem(product);
        toast.success(`Agregado: ${product.name}`);
    };

    const isOutOfStock = product.stock <= 0;

    return (
        <Link href={`/product/${product.id}`} className={cn(
            "group block relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border",
            !product.isActive && "opacity-50 grayscale"
        )}>
            <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
                <Image
                    src={(product.image.startsWith("http") || product.image.startsWith("/")) ? product.image : "/logo.png"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {isOutOfStock && (
                    <div className="absolute top-4 left-4 bg-gray-900/80 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                        AGOTADO
                    </div>
                )}

                {!product.isActive && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10">
                        <span className="bg-white text-gray-500 px-4 py-1 rounded-full text-xs font-bold border shadow-sm">
                            BORRADOR
                        </span>
                    </div>
                )}

                {/* Overlay/Action on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent flex justify-center pb-6">
                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className={cn(
                            "bg-white text-primary font-bold py-2 px-6 rounded-full shadow-lg transform transition-all flex items-center gap-2",
                            isOutOfStock ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-400" : "hover:bg-primary hover:text-white"
                        )}
                    >
                        <ShoppingBag className="h-4 w-4" />
                        {isOutOfStock ? "Agotado" : "Agregar"}
                    </button>
                </div>
            </div>

            <div className="p-4 text-center">
                <h3 className="text-gray-900 font-medium text-lg leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1 mb-2 italic">{product.category}</p>
                <p className="text-primary font-bold text-xl">S/ {product.price.toFixed(2)}</p>
            </div>
        </Link >
    );
}
