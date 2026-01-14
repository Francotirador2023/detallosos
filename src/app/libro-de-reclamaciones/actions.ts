"use server";

import { sendComplaintNotification } from "@/lib/email";

export async function submitComplaint(formData: FormData) {
    const data = {
        fullName: formData.get("fullName"),
        documentId: formData.get("documentId"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        type: formData.get("type"), // 'reclamo' or 'queja'
        orderNumber: formData.get("orderNumber"),
        contractedDetail: formData.get("contractedDetail"),
        claimDetail: formData.get("claimDetail"),
        customerRequest: formData.get("customerRequest"),
    };

    // Basic validation
    if (!data.fullName || !data.documentId || !data.email || !data.claimDetail) {
        return { success: false, error: "Por favor complete todos los campos obligatorios." };
    }

    const result = await sendComplaintNotification(data);

    if (result?.success) {
        return { success: true };
    } else {
        return { success: false, error: "Hubo un error al enviar su reclamación. Por favor intente más tarde." };
    }
}
