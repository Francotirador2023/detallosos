import { MetadataRoute } from 'next'
import db from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://detallosos.vercel.app'

    // 1. Static Routes
    const routes = [
        '',
        '/products',
        '/nosotros',
        '/faq',
        '/terminos',
        '/privacidad',
        '/cambios-devoluciones',
        '/rastreo',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Categories
    const categories = [
        'exclusivo',
        'enamorados',
        'cumpleanos',
        'aniversarios',
        'nacimientos',
        'box-regalos',
        'eventos',
    ].map((slug) => ({
        url: `${baseUrl}/category/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }))

    // 3. Dynamic Products
    let products = [];
    try {
        products = await db.product.findMany({
            where: { isActive: true },
            select: { id: true, updatedAt: true },
        })
    } catch (e) {
        console.error("Failed to fetch products for sitemap", e);
    }

    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...routes, ...categories, ...productRoutes]
}
