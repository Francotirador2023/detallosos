import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import ProductCard from "@/components/ProductCard";
import db from "@/lib/db";

interface PageProps {
    params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;

    const product = await db.product.findUnique({
        where: { id }
    });

    if (!product) {
        notFound();
    }

    // Related products (exclude current) - simplified logic for DB
    const related = await db.product.findMany({
        where: {
            category: product.category,
            NOT: { id: product.id }
        },
        take: 4
    });

    // Data conversion for client component
    const productForClient = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        category: product.category || "",
        description: product.description || "",
        stock: (product as any).stock || 0,
        isActive: (product as any).isActive ?? true
    };

    const relatedForClient = related
        .filter((p: any) => p.isActive !== false)
        .map((p: any) => ({
            id: p.id,
            name: p.name,
            price: Number(p.price),
            image: p.image,
            category: p.category || "",
            description: p.description || "",
            stock: (p as any).stock || 0,
            isActive: (p as any).isActive ?? true
        }));

    return (
        <div className="min-h-screen bg-white">
            <ProductView product={productForClient} relatedProducts={relatedForClient} />

            {/* Related Section */}
            <div className="bg-gray-50 py-16">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold mb-8">También te puede encantar</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {relatedForClient.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
