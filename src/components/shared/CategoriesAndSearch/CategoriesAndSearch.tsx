"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

import styles from "./CategoriesAndSearch.module.scss";
import { CategoriesList } from "./components/CategoriesList/CategoriesList";
import { FiltersAndList } from "./components/FiltersAndList/FiltersAndList";
import { SubCategoriesList } from "./components/SubCategoriesList/SubCategoriesList";
import { useProductFilterStore } from "@/utils/lib/store/products";
import { ProductsService } from "@/utils/services/products";

type CategoriesAndSearchProp = {
  category: Category | null;
  categoriesList: Category[];
};

export const CategoriesAndSearch: React.FC<CategoriesAndSearchProp> = ({
  category,
  categoriesList,
}: CategoriesAndSearchProp) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search_text");

  const [categorySelected, setCategorySelected] = useState<Category | null>(category ?? null);
  const [subCategorySelected, setSubCategorySelected] = useState<SubcategorySearch | null>(null);

  const setFilteredProductsByCategoryAndSub = useProductFilterStore(
    state => state.setFilteredProductsByCategoryAndSub,
  );

  const setIsLoading = useProductFilterStore(state => state.setIsLoading);
  const setFullFilteredProducts = useProductFilterStore(state => state.setFullFilteredProducts);

  useLayoutEffect(() => {
    if (category) {
      setCategorySelected(category);
    }
  }, []);

  const { data: products, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: ProductsService.getAllActiveProducts,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(isFetching);
    }, 300);
  }, [isFetching]);

  useEffect(() => {
    if (products) {
      let productsFilter: Product[] = [];
      if (subCategorySelected) {
        productsFilter = products.filter(
          product => product.subcategory.id === subCategorySelected.id,
        );
      } else if (categorySelected) {
        productsFilter = products.filter(
          product => product.subcategory.categoryId === categorySelected.id,
        );
      } else {
        productsFilter = products;
      }

      if (search) {
        productsFilter = productsFilter.filter(product => product.name.includes(search));
      }

      setFilteredProductsByCategoryAndSub(productsFilter);
      setFullFilteredProducts(productsFilter);
    }
  }, [categorySelected, subCategorySelected, products, search]);

  useEffect(() => {
    setIsLoading(true);
  }, [categorySelected]);
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
          <FiltersAndList />
        </div>
      </div>
    </>
  );
};
