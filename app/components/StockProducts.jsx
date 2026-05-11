"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StockProductsComponent() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_URL}/api/stock`);
                const data = await res.json();
                setAllProducts(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    const handleProduct = (product) => {
        router.push(`/stockproducts/${product.slug}`);
    };

    return (
        <div className="px-6 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">
                Stock Equipment
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {allProducts.map((p, i) => (
                    <div
                        key={i}
                        onClick={() => handleProduct(p)}
                        className="bg-white shadow-md rounded-lg overflow-hidden group cursor-pointer"
                    >
                        <div className="relative">
                            <img
                                src={p.imageUrl}
                                alt={p.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                <span className="text-white text-lg font-semibold">
                                    Quick View
                                </span>
                            </div>
                        </div>

                        <div className="p-4 text-center">
                            <h2 className="text-lg font-semibold">
                                {p.title}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}