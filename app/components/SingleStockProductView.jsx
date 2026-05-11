"use client";

import { useEffect, useState } from "react";

export default function SingleStockProduct({ slug }) {
    // const { slug } = params;

    const [product, setProduct] = useState(null);

    useEffect(() => {
         if (!slug) return; // safety
        const fetchProduct = async () => {
            const res = await fetch(`${API_URL}/api/stock/${slug}`);
            const data = await res.json();
            setProduct(data);
        };

        fetchProduct();
    }, [slug]);

    if (!product) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="grid md:grid-cols-2 gap-10">

                {/* LEFT - IMAGE */}
                <div>
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full rounded-lg shadow"
                    />
                </div>

                {/* RIGHT - DETAILS */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {product.title}
                    </h1>

                    <p className="text-gray-500 mb-4">
                        Ref: {product.slug}
                    </p>

                    {/* PRICE */}
                    <p className="text-orange-500 font-semibold text-lg mb-6">
                        Price: Upon Request
                    </p>

                    {/* BUTTON INSTEAD OF FORM */}
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                        onClick={() => alert("Request sent")}
                    >
                        Request Quote
                    </button>
                </div>
            </div>

            {/* SPECIFICATIONS */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">
                    Specifications
                </h2>

                <div className="border rounded-lg overflow-hidden">
                    {product.specifications?.map((item, i) => (
  <div
    key={i}
    className="flex justify-between border-b px-4 py-2"
  >
    <span className="font-medium">{item.label}</span>
    <span>{item.value}</span>
  </div>
))}
                </div>
            </div>
        </div>
    );
}