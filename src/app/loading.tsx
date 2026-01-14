export default function Loading() {
    return (
        <div className="container-custom py-12">
            {/* Banner Skeleton */}
            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-3xl animate-pulse mb-12" />

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 space-y-4 border border-gray-100">
                        <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
