"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Heart, Menu, X, Facebook, Phone } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/data";
import { Product } from "@/lib/store";

export default function Navbar() {
    const cartItems = useCartStore((state) => state.items);
    const toggleCart = useCartStore((state) => state.toggleCart);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { name: "Ver Catálogo", href: "/products" },
        { name: "Productos Exclusivos", href: "/category/exclusivo" },
        { name: "Enamorados", href: "/category/enamorados" },
        { name: "Cumpleaños", href: "/category/cumpleanos" },
        { name: "Aniversarios", href: "/category/aniversarios" },
        { name: "Nacimientos", href: "/category/nacimientos" },
        { name: "Box Regalos", href: "/category/box-regalos" },
        { name: "Eventos", href: "/category/eventos" },
    ];

    // Debounced Search
    useEffect(() => {
        if (!searchQuery) {
            setSearchResults([]);
            return;
        }

        const timer = setTimeout(() => {
            const results = PRODUCTS.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
            setIsSearchOpen(true);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
            <div className="container-custom flex items-center justify-between h-28 md:h-40">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-28 w-64 md:h-40 md:w-96 -my-4 transition-transform hover:scale-105">
                        <Image
                            src="/logo-new.png"
                            alt="DetallOsos Logo"
                            fill
                            className="object-contain object-left md:object-center mix-blend-multiply"
                            priority
                            sizes="(max-width: 768px) 256px, 384px"
                        />
                    </div>
                </Link>

                {/* Desktop Search */}
                <div ref={searchRef} className="hidden md:flex flex-1 max-w-md mx-8 relative">
                    <input
                        type="text"
                        placeholder="Buscar arreglos..."
                        className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => { if (searchQuery) setIsSearchOpen(true); }}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                    {/* Search Dropdown */}
                    {isSearchOpen && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow-xl mt-2 overflow-hidden z-50">
                            {searchResults.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchQuery("");
                                    }}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b last:border-0"
                                >
                                    <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                                        <Image src={(product.image?.startsWith("http") || product.image?.startsWith("/")) ? product.image : "/logo.png"} alt={product.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                        <p className="text-xs text-primary font-bold">S/ {product.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4">
                    {/* Social Links */}
                    <div className="hidden sm:flex items-center gap-2 border-r pr-4 mr-2">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors"
                        >
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a
                            href="https://wa.me/51935638342"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-green-50 text-green-600 rounded-full transition-colors"
                        >
                            <Phone className="h-5 w-5" />
                        </a>
                    </div>

                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                        <User className="h-6 w-6 text-gray-700" />
                    </button>


                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                    >
                        <ShoppingCart className="h-6 w-6 text-gray-700" />
                        {isMounted && cartCount > 0 && (
                            <span className="absolute top-0 right-0 h-5 w-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Categories Bar (Desktop) */}
            <div className="hidden md:block bg-secondary border-t border-border">
                <div className="container-custom flex justify-center gap-8 py-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors uppercase tracking-wide"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu (Overlay) */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg py-4 px-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="py-2 text-gray-700 font-medium hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
