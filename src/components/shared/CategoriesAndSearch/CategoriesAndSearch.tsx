"use client";

import { useEffect, useState } from "react";

import styles from "./CategoriesAndSearch.module.scss";
import { CategoriesList } from "./components/CategoriesList/CategoriesList";
import { FiltersAndList } from "./components/FiltersAndList/FiltersAndList";
import { SubCategoriesList } from "./components/SubCategoriesList/SubCategoriesList";

type CategoriesAndSearchProp = {
  category: Category | null;
  categoriesList: Category[];
  product: Product[];
};

export const CategoriesAndSearch: React.FC<CategoriesAndSearchProp> = ({
  category,
  categoriesList,
  product,
}: CategoriesAndSearchProp) => {
  const [categorySelected, setCategorySelected] = useState<Category | null>(category ?? null);
  const [subCategorySelected, setSubCategorySelected] = useState<SubcategorySearch | null>(null);

  useEffect(() => {
    setSubCategorySelected(null);
    categorySelected === null;
  }, [categorySelected]);

  useEffect(() => {
    if (category) {
      setCategorySelected(category);
    }
  }, []);

  return (
    <>
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
          <FiltersAndList product={product} />
        </div>
      </div>
    </>
  );
};
