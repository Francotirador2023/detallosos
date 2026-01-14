import db from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function TestDBPage() {
    try {
        const count = await db.product.count();
        return (
            <div className="p-8 bg-green-50 border border-green-200 rounded-xl">
                <h1 className="text-2xl font-bold text-green-700">Conexión Exitosa</h1>
                <p className="mt-2 text-green-600">
                    Se detectaron {count} productos en la base de datos.
                </p>
                <div className="mt-4 p-4 bg-white rounded border">
                    <p className="text-sm font-mono">DATABASE_URL configurada correctamente.</p>
                </div>
            </div>
        );
    } catch (error: any) {
        return (
            <div className="p-8 bg-red-50 border border-red-200 rounded-xl font-mono">
                <h1 className="text-2xl font-bold text-red-700">Error de Conexión</h1>
                <p className="mt-4 p-4 bg-white rounded border whitespace-pre-wrap text-sm">
                    {error.message || "Error desconocido"}
                </p>
                <div className="mt-6 space-y-4 text-xs text-gray-600">
                    <p>Causas probables:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Falta la variable DATABASE_URL en Netlify.</li>
                        <li>La contraseña tiene caracteres especiales no escapados.</li>
                        <li>El puerto 5432 está bloqueado (prueba con 6543 para el pooler).</li>
                        <li>Supabase requiere sslmode=require en la URL.</li>
                    </ul>
                </div>
            </div>
        );
    }
}
