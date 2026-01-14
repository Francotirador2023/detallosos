import { Edit, Plus, Trash2, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import db from "@/lib/db";
import { deleteProduct } from "../actions";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = (await db.product.findMany() as any[])
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
                    <p className="text-gray-500">Gestiona tu catálogo de flores y regalos.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Nuevo Producto
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-white"
                        />
                    </div>
                    <div className="text-sm text-gray-500">
                        Mostrando {products.length} resultados
                    </div>
                </div>

                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="px-6 py-4">Producto</th>
                            <th className="px-6 py-4">Categoría</th>
                            <th className="px-6 py-4 text-center">Stock</th>
                            <th className="px-6 py-4">Precio</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden relative border">
                                            {/* Safety Check: Only allow http/https or relative paths. Fallback for local file paths */}
                                            <Image
                                                src={(product.image.startsWith("http") || product.image.startsWith("/")) ? product.image : "/logo.png"}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{product.name}</p>
                                            <p className="text-xs text-gray-500">ID: {product.id.slice(-6)}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`font-bold ${Number(product.stock) <= 0 ? "text-red-500" : "text-gray-900"}`}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    S/ {Number(product.price).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {product.isActive ? (
                                            <>
                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                <span className="text-green-700 font-medium text-xs">Público</span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="h-2 w-2 rounded-full bg-gray-400" />
                                                <span className="text-gray-500 font-medium text-xs">Borrador</span>
                                            </>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/products/${product.id}`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                        <form action={deleteProduct}>
                                            <input type="hidden" name="id" value={product.id} />
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
