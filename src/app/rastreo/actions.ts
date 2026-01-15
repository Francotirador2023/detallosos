'use server';

import db from "@/lib/db";

export async function getOrderStatus(orderId: string) {
    if (!orderId || orderId.length < 5) {
        return { success: false, error: "ID de pedido inválido" };
    }

    try {
        const order = await db.order.findUnique({
            where: { id: orderId },
            select: {
                id: true,
                status: true,
                createdAt: true,
                deliveryDate: true,
                district: true,
                customer: true, // Show only first name or masked in UI if needed for privacy
            }
        });

        if (!order) {
            return { success: false, error: "No encontramos un pedido con ese código." };
        }

        return { success: true, order };
    } catch (error) {
        console.error("Error fetching order status:", error);
        return { success: false, error: "Error al consultar el sistema. Intente luego." };
    }
}
