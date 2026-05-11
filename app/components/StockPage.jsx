"use client";

import { useState } from "react";
import TiptapEditor from "./TipTapEditor";

export default function StockPage() {
  const [slug, setslug] = useState("");
  const [title, settitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [specification, setSpecification] = useState([
    { label: "", value: "" },
  ]);

  const handleStockSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitle = (value) => {
    settitle(value.replace(/<[^>]+>/g, ""));
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formdata = new FormData();
    formdata.append("file", imageFile);

    try {
      const res = await fetch(`${API_URL}/api/stock/uploadstockimage`, {
        method: "POST",
        body: formdata,
      });

      const data = await res.json(); // ⚠️ FIXED
      setImageUrl(data.url);
    } catch (error) {
      console.error("Image upload failed");
    }
  };

  const handleSpecification = (index, field, value) => {
    const updated = [...specification];
    updated[index][field] = value;
    setSpecification(updated);
  };

  const addRow = () => {
    setSpecification([...specification, { label: "", value: "" }]);
  };

  const removeRow = (index) => {
    setSpecification(specification.filter((_, i) => i !== index));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const specInvalid = specification.some(
    (item) => !item.label || !item.value
  );

  if (!slug || !title || !imageUrl || specInvalid) {
    alert("All fields are required");
    return;
  }

  const data = {
    slug,
    title,
    imageUrl,
    specifications: specification, // ✅ FIXED
  };

  try {
    const res = await fetch(`${API_URL}/api/stock`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
    alert("Stock Product Added successfully");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
<form onSubmit = {handleSubmit}>
        <h1 className="text-2xl font-semibold">Add Stock</h1>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            value={slug}
            onChange={(e) => setslug(handleStockSlug(e.target.value))}
            placeholder="enter-product-slug"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <div className="border rounded-lg p-2">
            <TiptapEditor value={title} onChange={handleTitle} />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm"
          />
          {imageUrl && (<img src={imageUrl} className="w-40 mt-3 rounded"/>)}

          {/* Preview */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="preview"
              className="mt-4 w-40 h-40 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Specification Table */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium">Specifications</h2>

            <button
              type="button"
              onClick={addRow}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              + Add Row
            </button>
          </div>

          <div className="overflow-hidden border rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Label</th>
                  <th className="p-3 text-left">Value</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {specification.map((item, index) => (
                  <tr key={index} className="border-t">
                    
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) =>
                          handleSpecification(index, "label", e.target.value)
                        }
                        placeholder="e.g. Weight"
                        className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) =>
                          handleSpecification(index, "value", e.target.value)
                        }
                        placeholder="e.g. 10kg"
                        className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                      />
                    </td>

                    <td className="p-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(index)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
            Save Stock
          </button>
        </div>
        </form>

      </div>
    </div>
  );
}