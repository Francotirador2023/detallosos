'use server'

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "detallosos" },
            (error, result) => {
                if (error || !result) {
                    reject(error || new Error("Upload failed"));
                } else {
                    resolve(result.secure_url);
                }
            }
        ).end(buffer);
    });
}

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
        try {
            imageUrl = await uploadToCloudinary(imageFile);
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            imageUrl = "https://images.unsplash.com/photo-1596627685028-2e0655ee14e8?auto=format&fit=crop&q=80&w=800";
        }
    } else {
        // Fallback to random high-quality image based on category
        imageUrl = "https://images.unsplash.com/photo-1596627685028-2e0655ee14e8?auto=format&fit=crop&q=80&w=800";
        if (category === "Tulipanes") imageUrl = "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&q=80&w=800";
    }

    const stock = parseInt(formData.get("stock") as string) || 0;
    const isActive = formData.get("isActive") === "true";

    await (db.product as any).create({
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
    redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;
    const existingImage = formData.get("existingImage") as string;

    let imageUrl = existingImage;

    if (imageFile && imageFile.size > 0) {
        try {
            imageUrl = await uploadToCloudinary(imageFile);
        } catch (error) {
            console.error("Cloudinary upload error:", error);
        }
    }

    const stock = parseInt(formData.get("stock") as string) || 0;
    const isActive = formData.get("isActive") === "true";

    await (db.product as any).update({
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
    redirect("/admin/products");
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
