import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;

  // Fetch product details using productId (mock or API)
  const product = {
    id: productId,
    name: "Example Product",
    price: "$199",
    description: "This is a sample product",
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-lg font-semibold mt-4">{product.price}</p>
    </div>
  );
}
