import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Realistic data with working images
const PRODUCTS = [
    // ROSAS
    {
        name: "Ramo Amor Eterno (24 Rosas)",
        price: 189.00,
        image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=800",
        category: "Rosas",
        description: "24 rosas rojas importadas de tallo largo."
    },
    {
        name: "Caja Corazón Premium",
        price: 249.00,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
        category: "Amor",
        description: "Diseño exclusivo en forma de corazón con rosas frescas."
    },

    // TULIPANES
    {
        name: "Tulipanes Holandeses",
        price: 159.00,
        image: "https://images.unsplash.com/photo-1572454591674-2739f30d8c40?auto=format&fit=crop&q=80&w=800",
        category: "Tulipanes",
        description: "10 tulipanes premium traídos de Holanda."
    },

    // MIXTOS
    {
        name: "Primavera Mix",
        price: 140.00,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800",
        category: "Nacimientos",
        description: "Una mezcla vibrante de flores de estación."
    },

    // EXCLUSIVOS
    {
        name: "Orquídea Blanca",
        price: 280.00,
        image: "https://images.unsplash.com/photo-1566938064504-a38b58a5529c?auto=format&fit=crop&q=80&w=800",
        category: "Exclusivo",
        description: "Elegancia pura con esta orquídea de doble vara."
    },
]

async function main() {
    console.log('Start seeding ...')

    // Limpiar base de datos antes de sembrar (opcional pero recomendado en dev)
    try {
        await prisma.orderItem.deleteMany();
        await prisma.order.deleteMany();
        await prisma.product.deleteMany();
        console.log('Database cleaned.');
    } catch (e) {
        console.log('Database clean failed or empty, continuing...');
    }

    for (const product of PRODUCTS) {
        // Generate a consistent ID based on name for idempotency if needed, 
        // or just let Prisma generate cuid. Using create is fine after deleteMany.
        const p = await prisma.product.create({
            data: {
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                description: product.description,
            },
        })
        console.log(`Created product: ${p.name}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
