import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const total = await prisma.product.count();
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            category: true,
            isActive: true,
            createdAt: true
        }
    });

    console.log("Total Products:", total);
    console.table(products);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
