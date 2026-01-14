"use client";

import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Show after 2 seconds
        const timer = setTimeout(() => setIsVisible(true), 2000);

        // Show tooltip every 10 seconds for 3 seconds
        const tooltipInterval = setInterval(() => {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 4000);
        }, 15000);

        return () => {
            clearTimeout(timer);
            clearInterval(tooltipInterval);
        };
    }, []);

    const phoneNumber = "51935638342";
    const message = encodeURIComponent("¡Hola! Me gustaría realizar un pedido o recibir más información.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        className="relative"
                    >
                        {/* Tooltip/Label */}
                        <AnimatePresence>
                            {showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap text-sm font-medium mr-2"
                                >
                                    ¿En qué podemos ayudarte?
                                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-gray-100 rotate-45" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main Button */}
                        <motion.a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba5a] transition-colors duration-300 group"
                        >
                            <MessageCircle className="w-8 h-8 fill-current" />

                            {/* Pulse Effect */}
                            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping group-hover:hidden" />
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
