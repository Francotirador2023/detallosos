import ProductCard from "@/components/ProductCard";
import db from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;

    const categoryTitle =
        slug === "exclusivo" ? "Productos Exclusivos" :
            slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');

    // Fetch from DB where category contains slug (case-insensitive simulation)
    // For SQLite we can just fetch all and filter or use exact match if we are careful.
    // Let's rely on exact match for "Rosas", "Tulipanes" etc ideally,
    // but our data has "Rosas", slug is "rosas".
    // SQLite default collation might be case insensitive or we need raw query.
    // Safest for MVP: Fetch all, filter in JS (dataset < 1000 items).
    // Or simpler: findMany where category equals Title Case slug.

    const allProducts = await db.product.findMany();
    const products = allProducts
        .filter((p: any) => p.isActive !== false) // Filter by active status in JS
        .filter(p => p.category?.toLowerCase() === slug.toLowerCase());

    if (products.length === 0) {
        return (
            <div className="min-h-screen container-custom py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">{categoryTitle}</h1>
                <p className="text-gray-500">No hay productos disponibles en esta categoría por el momento.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{categoryTitle}</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">Explora nuestra exclusiva selección de {categoryTitle} y arreglos diseñados para enamorar.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                ...product,
                                price: Number(product.price),
                                category: product.category || "",
                                description: product.description || "",
                                stock: (product as any).stock || 0,
                                isActive: (product as any).isActive ?? true
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
