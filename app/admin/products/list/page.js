"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API_URL from "@/app/config/api";

export default function AdminProductList() {

  const [products, setProducts] = useState([]);
  const router = useRouter();

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    const res = await fetch(`${API_URL}/api/products`);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return await res.json();
  };

  // AUTH CHECK + FETCH PRODUCTS
  useEffect(() => {

    const user = localStorage.getItem("user");

    // Redirect if not logged in
    if (!user) {
      router.push("/login");
      return;
    }

    // Load products
    (async () => {
      try {

        const json = await fetchProducts();

        setProducts(json);

      } catch (err) {

        console.error("Failed to load products", err);

      }
    })();

  }, [router]);

  // DELETE PRODUCT
  const handleDelete = async (id) => {

    if (!confirm("Delete product?")) return;

    try {

      const res = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {

        const updated = await fetchProducts();

        setProducts(updated);

      } else {

        alert("Delete failed");

      }

    } catch (err) {

      console.error(err);

      alert("Something went wrong");

    }
  };

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="container flex gap-20 items-center mb-10">

        <h1 className="admin-title text-3xl font-bold">
          Product List
        </h1>

        <button
          className="edit-btn"
          onClick={() => router.push("/admin/products/add")}
        >
          Add New Product
        </button>

      </div>

      {/* TABLE */}
      <div className="table-wrapper overflow-x-auto">

        <table className="admin-table w-full border-collapse">

          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th style={{ textAlign: "center" }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {products.length > 0 ? (

              products.map((p) => (

                <tr key={p._id}>

                  <td>{p.title}</td>

                  <td>{p.category}</td>

                  <td>₹{p.price}</td>

                  <td className="action-cell flex gap-2 justify-center">

                    <Link
                      className="edit-btn"
                      href={`/admin/products/edit/${p._id}`}
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="4" className="text-center py-10">
                  No products found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
