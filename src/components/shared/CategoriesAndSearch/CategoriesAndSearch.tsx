"use client";

import styles from "./CategoriesAndSearch.module.scss";
import { CategoriesList } from "./components/CategoriesList/CategoriesList";
import { FiltersAndList } from "./components/FiltersAndList/FiltersAndList";
import { SubCategoriesList } from "./components/SubCategoriesList/SubCategoriesList";
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
    price,
    setSort,
    sort,
    setPrice,
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
    <div className={styles.categories}>
      <div className={styles.categories__container}>
        <h1 className={styles.categories__title}>
          {categorySelected ? categorySelected.name : "Категорії"}
        </h1>
        <section className={styles.categories__subcategories}>
          {!categorySelected ? (
            <CategoriesList
              categorySelected={categorySelected}
              setCategorySelected={setCategorySelected}
              categoriesList={categoriesList}
            />
          ) : (
            <SubCategoriesList
              setCategorySelected={setCategorySelected}
              subCategorySelected={subCategorySelected}
              setSubCategorySelected={setSubCategorySelected}
              categorySelected={categorySelected}
            />
          )}
        </section>
        <FiltersAndList
          properties={properties}
          setSort={setSort}
          sort={sort}
          price={price}
          setPrice={setPrice}
          setProperties={setProperties}
          maxPrice={maxPrice}
          minPrice={minPrice}
          debounced={debounced}
          isLoadingProducts={isLoadingProducts}
          seIsLoadingProducts={seIsLoadingProducts}
        />
      </div>
    </div>
  );
};
