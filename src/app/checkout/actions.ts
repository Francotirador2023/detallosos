'use server'

import db from "@/lib/db";
import { sendOrderNotification } from "@/lib/email";

export async function processCheckout(orderData: {
    customerName: string;
    phone: string;
    address: string;
    district: string;
    reference?: string;
    deliveryDate?: string;
    message?: string;
    items: { id: string; name: string; price: number; quantity: number }[];
    total: number;
}) {
    try {
        // 1. Guardar en base de datos - Usando as any por si el cliente no se generó bien en Windows
        const order = await (db.order as any).create({
            data: {
                customer: orderData.customerName,
                phone: orderData.phone,
                address: orderData.address,
                district: orderData.district,
                reference: orderData.reference,
                deliveryDate: orderData.deliveryDate,
                giftMessage: orderData.message,
                total: orderData.total,
                status: "PENDING",
                items: {
                    create: orderData.items.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        // 2. Enviar notificación por correo
        await sendOrderNotification(orderData);

        return { success: true, orderId: order.id };
    } catch (error) {
        console.error("Error al procesar el checkout:", error);
        return { success: false, error: "Error al procesar el pedido" };
    }
}
