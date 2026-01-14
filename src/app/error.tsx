'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Algo salió mal!</h2>
            <p className="text-gray-600 mb-8 max-w-md bg-white p-4 rounded-lg shadow-sm font-mono text-sm border border-red-100">
                {error.message || "Error desconocido en la aplicación."}
            </p>
            <button
                onClick={() => reset()}
                className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-red-700 transition-colors"
            >
                Intentar de nuevo
            </button>
        </div>
    );
}
