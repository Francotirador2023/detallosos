"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flower, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simple login simulation
        // In a real app, this would be a server action that sets a secure cookie
        if (password === "admin123") {
            // Set cookie (simulation for middleware)
            document.cookie = "admin_session=true; path=/; max-age=86400";
            toast.success("¡Bienvenido, Administrador!");
            router.push("/admin/dashboard");
        } else {
            toast.error("Contraseña incorrecta");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-xl mb-6">
                        <Flower className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Detallosos Admin</h1>
                    <p className="text-gray-500 mt-2">Ingresa tu contraseña para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-red-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            "Acceder al Panel"
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                        Solo personal autorizado
                    </p>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => router.push("/")}
                        className="text-sm text-gray-500 hover:text-primary transition-colors font-medium"
                    >
                        &larr; Volver a la tienda
                    </button>
                </div>
            </div>
        </div>
    );
}
