"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Flower
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Productos", href: "/admin/products", icon: Package },
        { name: "Ordenes", href: "/admin/orders", icon: ShoppingCart },
        { name: "Clientes", href: "/admin/customers", icon: Users },
        { name: "Configuración", href: "/admin/settings", icon: Settings },
    ];

    const handleLogout = () => {
        document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/";
    };

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col fixed inset-y-0">
                <div className="h-16 flex items-center px-6 border-b">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
                        <Flower className="text-primary h-6 w-6" />
                        <span>Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname?.startsWith(item.href) || false;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-red-50 text-primary"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                {/* Header */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-30">
                    <h1 className="font-semibold text-gray-700 capitalize">
                        {pathname?.split("/").pop() || "Dashboard"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
