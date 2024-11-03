import { getAllActiveProducts, getProduct, getSimilarProducts } from "@/utils/lib/actions/product";

import { ProductPage } from "./components/productPage/productPage";

export async function generateStaticParams() {
  const products = await getAllActiveProducts();

  return products.map(product => ({
    id: product.id,
  }));
}

export default async function Product({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  const similarProducts = await getSimilarProducts(params.id);

  return <ProductPage product={product} similarProducts={similarProducts}/>;
}
