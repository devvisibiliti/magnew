import ProductDetails from "../../components/SingleProductCard";
import API_URL from "@/app/config/api";

async function getProduct(slug) {

  const res = await fetch(
    `${API_URL}/api/singleproduct/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  return res.json();
}

export default async function ProductPage({ params }) {

  // IMPORTANT FIX
  const { slug } = await params;

  console.log("SLUG:", slug);

  const product = await getProduct(slug);

  return <ProductDetails product={product} />;
}