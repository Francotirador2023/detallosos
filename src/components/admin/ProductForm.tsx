"use client";

import { Save, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { createProduct, updateProduct } from "@/app/admin/actions";
import { CATEGORIES } from "@/lib/constants";

interface ProductFormProps {
    initialData?: {
        id: string;
        name: string;
        price: number;
        description: string | null;
        category: string;
        image: string;
        stock: number;
        isActive: boolean;
    };
    mode: "create" | "edit";
}

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
            {pending ? "Guardando..." : (
                <>
                    <Save className="h-4 w-4" />
                    {mode === "create" ? "Guardar Producto" : "Actualizar Producto"}
                </>
            )}
        </button>
    );
}

interface ActionResponse {
    success: boolean;
    message?: string;
}

export default function ProductForm({ initialData, mode }: ProductFormProps) {
    const action = mode === "create" ? createProduct : updateProduct;
    const [state, formAction] = useActionState<ActionResponse, FormData>(
        action as any,
        { success: false }
    );
    const [preview, setPreview] = useState<string | null>(initialData?.image || null);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            router.push("/admin/products");
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {mode === "create" ? "Nuevo Producto" : "Editar Producto"}
                    </h1>
                    <p className="text-gray-500">
                        {mode === "create"
                            ? "Completa la información para publicar."
                            : "Actualiza los detalles de tu producto."}
                    </p>
                </div>
            </div>

            <form action={formAction} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {mode === "edit" && <input type="hidden" name="id" value={initialData?.id} />}
                {mode === "edit" && <input type="hidden" name="existingImage" value={initialData?.image} />}

                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h3 className="font-bold text-lg mb-4">Información Básica</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                            <input
                                name="name"
                                type="text"
                                required
                                defaultValue={initialData?.name}
                                className="w-full border rounded-lg p-2.5"
                                placeholder="Ej: Ramo de Rosas Premium"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/)</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    required
                                    defaultValue={initialData?.price}
                                    className="w-full border rounded-lg p-2.5"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock (Unidades)</label>
                                <input
                                    name="stock"
                                    type="number"
                                    required
                                    defaultValue={mode === "edit" ? initialData?.stock : 10}
                                    className="w-full border rounded-lg p-2.5"
                                    placeholder="10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea
                                name="description"
                                defaultValue={initialData?.description || ""}
                                className="w-full border rounded-lg p-2.5 h-32"
                                placeholder="Describe los detalles del arreglo..."
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar / Media */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-4">Estado & Categoría</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                <select
                                    name="category"
                                    defaultValue={initialData?.category || "exclusivo"}
                                    className="w-full border rounded-lg p-2.5 bg-white"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estado de Publicación</label>
                                <select
                                    name="isActive"
                                    defaultValue={mode === "edit" ? (initialData?.isActive ? "true" : "false") : "true"}
                                    className="w-full border rounded-lg p-2.5 bg-white"
                                >
                                    <option value="true">Activo / Publicado</option>
                                    <option value="false">Oculto / Borrador</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-4">Imagen Principal</h3>
                        <div className="space-y-4">
                            {preview && (
                                <div className="relative aspect-square w-full rounded-lg overflow-hidden border bg-gray-50">
                                    <Image
                                        src={preview}
                                        alt="Vista previa"
                                        fill
                                        className="object-cover"
                                        unoptimized={preview?.startsWith('blob:')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPreview(null)}
                                        className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full shadow-sm text-red-500 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            <label className="block">
                                <span className="sr-only">Elegir imagen</span>
                                <input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-red-50 file:text-primary
                                        hover:file:bg-red-100
                                        cursor-pointer
                                    "
                                />
                            </label>
                            <p className="text-xs text-gray-400">
                                * Sube una imagen clara (formato JPG, PNG o WebP). Máx 5MB.
                            </p>
                        </div>
                    </div>

                    <SubmitButton mode={mode} />
                </div>
            </form>
        </div>
    );
}
