import { getAllCategories, getOneCategory } from "@/utils/lib/actions/category";
import { getAllActiveProducts } from "@/utils/lib/actions/product";

import { CategoriesAndSearch } from "@/components";

export default async function Categories({ params }: { params: { category: string } }) {
  const decodedCategory = decodeURIComponent(params.category);

  const categorySelected = await getOneCategory(decodedCategory);
  const categories = await getAllCategories();
  const product = await getAllActiveProducts();

  return (
    <CategoriesAndSearch
      category={categorySelected}
      categoriesList={categories}
      product={product}
    />
  );
}
