const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function check() {
    const products = await prisma.product.findMany();
    console.log("Found products:", products.length);
    products.forEach(p => {
        console.log(`- ${p.name} (${p.category}) - Active: ${p.isActive}`);
    });
    await prisma.$disconnect();
}

check();
