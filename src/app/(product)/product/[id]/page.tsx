import { getAllActiveProducts } from "@/utils/lib/actions/product";

import { ProductPage } from "./components/productPage/productPage";

export async function generateStaticParams() {
  const products = await getAllActiveProducts();

  return products.map(product => ({
    id: product.id,
  }));
}

export default function Product({ params }: { params: { id: string } }) {
  return <ProductPage id={params.id} />;
}
