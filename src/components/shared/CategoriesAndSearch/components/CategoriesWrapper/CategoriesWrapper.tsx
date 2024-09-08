import React, { Dispatch, SetStateAction } from "react";

import styles from "../../CategoriesAndSearch.module.scss";
import { CategoriesList } from "../CategoriesList/CategoriesList";
import { FiltersAndList } from "../FiltersAndList/FiltersAndList";
import { SubCategoriesList } from "../SubCategoriesList/SubCategoriesList";

type CategoriesWrapperProp = {
  categorySelected: Category | null;
  setCategorySelected: Dispatch<SetStateAction<Category | null>>;
  subCategorySelected: SubcategorySearch | null;
  setSubCategorySelected: Dispatch<SetStateAction<SubcategorySearch | null>>;
  properties: UniqueProperty[];
  setSort: Dispatch<SetStateAction<string>>;
  sort: string;
  setProperties: Dispatch<SetStateAction<UniqueProperty[]>>;
  maxPrice: number;
  minPrice: number;
  isLoadingProducts: boolean;
  debounced: () => void;
  seIsLoadingProducts: Dispatch<SetStateAction<boolean>>;
  categoriesList: Category[];
};

export const CategoriesWrapper: React.FC<CategoriesWrapperProp> = React.memo(
  ({
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
    categoriesList,
  }: CategoriesWrapperProp) => {
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
  },
);
