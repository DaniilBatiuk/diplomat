"use client";

import { CategoriesWrapper } from "./components/CategoriesWrapper/CategoriesWrapper";
import { useFilter } from "./hooks/useFilter";

type CategoriesAndSearchProp = {
  category: Category | null;
  categoriesList: Category[];
};

export const CategoriesAndSearch: React.FC<CategoriesAndSearchProp> = ({
  category,
  categoriesList,
}: CategoriesAndSearchProp) => {
  const {
    categorySelected,
    setCategorySelected,
    subCategorySelected,
    setSubCategorySelected,
    properties,
    setSort,
    sort,
    setProperties,
    maxPrice,
    minPrice,
    debounced,
    isLoadingProducts,
    seIsLoadingProducts,
  } = useFilter({
    category,
    categoriesList,
  });

  return (
    <CategoriesWrapper
      categorySelected={categorySelected}
      setCategorySelected={setCategorySelected}
      subCategorySelected={subCategorySelected}
      setSubCategorySelected={setSubCategorySelected}
      properties={properties}
      setSort={setSort}
      sort={sort}
      setProperties={setProperties}
      maxPrice={maxPrice}
      minPrice={minPrice}
      debounced={debounced}
      isLoadingProducts={isLoadingProducts}
      seIsLoadingProducts={seIsLoadingProducts}
      categoriesList={categoriesList}
    />
  );
};
