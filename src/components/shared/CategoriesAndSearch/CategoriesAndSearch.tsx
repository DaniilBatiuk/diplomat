"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

import styles from "./CategoriesAndSearch.module.scss";
import { CategoriesList } from "./components/CategoriesList/CategoriesList";
import { FiltersAndList } from "./components/FiltersAndList/FiltersAndList";
import { SubCategoriesList } from "./components/SubCategoriesList/SubCategoriesList";
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
  const pathname = usePathname();
  const search = searchParams.get("search_text");

  const [categorySelected, setCategorySelected] = useState<Category | null>(category ?? null);
  const [subCategorySelected, setSubCategorySelected] = useState<SubcategorySearch | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useLayoutEffect(() => {
    if (category) {
      setCategorySelected(category);
    }
  }, []);

  const { data, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: ProductsService.getAllActiveProducts,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(isFetching);
    }, 300);
  }, [isFetching]);

  useEffect(() => {
    if (data) {
      let productsFilter: Product[] = [];

      setTimeout(() => {
        if (subCategorySelected) {
          productsFilter = data.filter(
            product => product.subcategory.id === subCategorySelected.id,
          );
        } else if (categorySelected) {
          productsFilter = data.filter(
            product => product.subcategory.categoryId === categorySelected.id,
          );
        } else {
          productsFilter = data;
        }

        if (search) {
          productsFilter = productsFilter.filter(product => product.name.includes(search));
        }

        setProducts(productsFilter);
      }, 300);
    }
  }, [categorySelected, subCategorySelected, data, search]);

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
          <FiltersAndList products={products} isFetching={isLoaded} />
        </div>
      </div>
    </>
  );
};
