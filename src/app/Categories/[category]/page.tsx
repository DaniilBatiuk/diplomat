import { getAllCategories, getOneCategory } from "@/utils/lib/actions/category";

import { CategoriesAndSearch } from "@/components";

export default async function Categories({ params }: { params: { category: string } }) {
  const decodedCategory = decodeURIComponent(params.category);

  const categorySelected = await getOneCategory(decodedCategory);
  const categories = await getAllCategories();

  return <CategoriesAndSearch category={categorySelected} categoriesList={categories} />;
}
