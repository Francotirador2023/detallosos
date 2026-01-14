const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testCreate() {
    console.log("Attempting to create a test product...");
    try {
        const product = await prisma.product.create({
            data: {
                name: "Test Product",
                price: 99.99,
                category: "exclusivo",
                description: "Test description",
                image: "https://images.unsplash.com/photo-1596627685028-2e0655ee14e8?auto=format&fit=crop&q=80&w=800",
                stock: 10,
                isActive: true,
            }
        });
        console.log("Product created successfully:", product);
    } catch (error) {
        console.error("Error creating product:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testCreate();
