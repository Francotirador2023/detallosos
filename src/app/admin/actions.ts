'use server'

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary Lazily
const getCloudinary = () => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.error("CRITICAL: Missing Cloudinary Environment Variables");
        return null;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return cloudinary;
};

async function uploadToCloudinary(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const cloudinary = getCloudinary();

    if (!cloudinary) {
        throw new Error("Configuración de Cloudinary no encontrada en el servidor.");
    }

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "detallosos" },
            (error, result) => {
                if (error || !result) {
                    console.error("Cloudinary Upload Stream Error:", error);
                    reject(error || new Error("Upload failed"));
                } else {
                    resolve(result.secure_url);
                }
            }
        ).end(buffer);
    });
}

export async function createProduct(prevState: any, formData: FormData) {
    try {
        console.log("Starting createProduct server action...");

        const name = formData.get("name") as string;
        const price = parseFloat(formData.get("price") as string);
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;

        // Note: we might rely solely on uploadedImageUrl to avoid Vercel body limits.
        // If imageFile is present, it means the client side didn't remove the name attribute or it's a fallback.
        const imageFile = formData.get("image") as File;
        const uploadedImageUrl = formData.get("uploadedImageUrl") as string;

        let imageUrl = "";

        if (uploadedImageUrl) {
            console.log("Using pre-uploaded image URL:", uploadedImageUrl);
            imageUrl = uploadedImageUrl;
        } else if (imageFile && imageFile.size > 0) {
            console.log("Attempting server-side upload for file size:", imageFile.size);
            try {
                imageUrl = await uploadToCloudinary(imageFile);
            } catch (error: any) {
                console.error("Cloudinary upload error:", error);
                return { success: false, message: `Error al subir la imagen: ${error.message}` };
            }
        } else {
            console.log("No image provided, using fallback.");
            // Fallback to random high-quality image based on category
            imageUrl = "https://images.unsplash.com/photo-1596627685028-2e0655ee14e8?auto=format&fit=crop&q=80&w=800";
            if (category === "Tulipanes") imageUrl = "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&q=80&w=800";
        }

        const stock = parseInt(formData.get("stock") as string) || 0;
        const isActive = formData.get("isActive") === "true";

        console.log("Creating product in DB...");
        await db.product.create({
            data: {
                name,
                price,
                category,
                description,
                image: imageUrl,
                stock,
                isActive,
            }
        });
        console.log("Product created successfully.");

        revalidatePath("/admin/products");
        revalidatePath("/");
        return { success: true, message: "Producto creado correctamente" };
    } catch (error: any) {
        console.error("Database error creating product:", error);
        return { success: false, message: error.message || "Error al guardar el producto en la base de datos." };
    }
}

export async function getCloudinarySignature() {
    try {
        const cloudinary = getCloudinary();
        if (!cloudinary) {
            throw new Error("Variables de entorno de Cloudinary no configuradas.");
        }

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp,
                folder: "detallosos",
            },
            process.env.CLOUDINARY_API_SECRET!
        );

        return {
            timestamp,
            signature,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY
        };
    } catch (error: any) {
        console.error("Error generating Cloudinary signature:", error);
        return { error: error.message || "Error generando firma" };
    }
}

export async function updateProduct(prevState: any, formData: FormData) {
    try {
        const id = formData.get("id") as string;
        const name = formData.get("name") as string;
        const price = parseFloat(formData.get("price") as string);
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;
        const imageFile = formData.get("image") as File;
        const existingImage = formData.get("existingImage") as string;
        const uploadedImageUrl = formData.get("uploadedImageUrl") as string;

        let imageUrl = existingImage;

        if (uploadedImageUrl) {
            imageUrl = uploadedImageUrl;
        } else if (imageFile && imageFile.size > 0) {
            try {
                imageUrl = await uploadToCloudinary(imageFile);
            } catch (error: any) {
                console.error("Cloudinary upload error:", error);
                return { success: false, message: "Error al actualizar la imagen." };
            }
        }

        const stock = parseInt(formData.get("stock") as string) || 0;
        const isActive = formData.get("isActive") === "true";

        await db.product.update({
            where: { id },
            data: {
                name,
                price,
                category,
                description,
                image: imageUrl,
                stock,
                isActive,
            }
        });

        revalidatePath("/admin/products");
        revalidatePath("/");
        return { success: true, message: "Producto actualizado correctamente" };
    } catch (error: any) {
        console.error("Database error updating product:", error);
        return { success: false, message: error.message || "Error al actualizar el producto." };
    }
}

export async function deleteProduct(formData: FormData) {
    const id = formData.get("id") as string;
    await db.product.delete({
        where: { id }
    });
    revalidatePath("/admin/products");
}

export async function updateOrderStatus(id: string, status: string) {
    await (db.order as any).update({
        where: { id },
        data: { status }
    });
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${id}`);
}
