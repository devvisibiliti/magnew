import SingleStockProduct from "../../components/SingleStockProductView";

export default async function StockProduct({ params }) {
    const { slug } = await params; // ✅ THIS IS THE FIX

    return <SingleStockProduct slug={slug} />;
}