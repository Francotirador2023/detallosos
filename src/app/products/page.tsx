import ProductCard from "@/components/ProductCard";
import db from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const allProducts = await db.product.findMany();
    const products = allProducts
        .filter((p: any) => p.isActive !== false) // Filter by active status in JS
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="min-h-screen bg-gray-50 py-12" suppressHydrationWarning>
            <div className="container-custom" suppressHydrationWarning>
                <div className="text-center mb-12" suppressHydrationWarning>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nuestro Catálogo</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">Explora nuestra colección completa de arreglos florales y regalos diseñados para crear momentos inolvidables.</p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No hay productos disponibles por el momento.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={{
                                    ...product,
                                    description: product.description ?? undefined,
                                    price: Number(product.price),
                                    category: product.category || "",
                                    stock: (product as any).stock || 0,
                                    isActive: (product as any).isActive ?? true
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
