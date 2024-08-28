"use client";

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "./CategoriesAndSearch.module.scss";
import { Aside } from "./components/Aside/Aside";
import { Card, Search, SkeletonCard } from "@/components";
import { ProductsService } from "@/utils/services/products";

type CategoriesAndSearchProp = {
  category?: Category | null;
  categoriesList?: Category[];
};

export const CategoriesAndSearch: React.FC<CategoriesAndSearchProp> = ({
  category,
  categoriesList,
}: CategoriesAndSearchProp) => {
  const [sort, setSort] = useState("Новинки");

  const [categoryActive, setCategoryActive] = useState(false);
  const [subCategorySelected, setSubCategorySelected] = useState<SubcategorySearch | null>(null);
  const [categorySelected, setCategorySelected] = useState<Category | null>(category ?? null);

  const [subCategoriesList, setSubCategoriesList] = useState<SubcategorySearch[]>(
    category ? category.subcategories : [],
  );

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setSubCategoriesList(categorySelected ? categorySelected.subcategories : []);
  }, [categorySelected]);

  useEffect(() => {
    if (category) {
      setCategorySelected(category);
    }
  }, []);

  const { data, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: ProductsService.getAllActiveProducts,
  });

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const categoryOpen = () => {
    setCategoryActive(prev => !prev);
    document.documentElement.classList.toggle("open_category");
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  return (
    <>
      <div className={styles.categories}>
        <div className={styles.categories__container}>
          <h1 className={styles.categories__title}>
            {categorySelected ? categorySelected.name : "Категорії"}
          </h1>
          <section className={styles.categories__subcategories}>
            {!categorySelected && categoriesList ? (
              <>
                <div
                  className={clsx(styles.categories__subcategories_item, {
                    [styles.active]: categorySelected === null,
                  })}
                  onClick={() => setCategorySelected(null)}
                >
                  Всі
                </div>
                {categoriesList.map(category => (
                  <div
                    key={category.id}
                    className={clsx(styles.categories__subcategories_item, {
                      [styles.active]: categorySelected === category,
                    })}
                    onClick={() => setCategorySelected(category)}
                  >
                    {category.name}
                  </div>
                ))}
              </>
            ) : (
              subCategoriesList && (
                <>
                  <div
                    className={clsx(styles.categories__subcategories_item, {
                      [styles.active]: subCategorySelected === null,
                    })}
                    onClick={() => setSubCategorySelected(null)}
                  >
                    Всі
                  </div>

                  {subCategoriesList.map(subcategory => (
                    <div
                      key={subcategory.id}
                      className={clsx(styles.categories__subcategories_item, {
                        [styles.active]: subCategorySelected === subcategory,
                      })}
                      onClick={() => setSubCategorySelected(subcategory)}
                    >
                      {subcategory.name}
                    </div>
                  ))}
                </>
              )
            )}
          </section>
          <section className={styles.categories__filters}>
            <Search className={styles.categories__search} />
            <div className={styles.categories__selects}>
              <button className={styles.categories__filter_button} onClick={categoryOpen}>
                <TuneOutlinedIcon /> Фільтр
              </button>
              <FormControl
                variant="standard"
                sx={{ minWidth: 140 }}
                className={styles.categories__select}
              >
                <InputLabel>Фільтрація по ціні</InputLabel>
                <Select value={sort} onChange={handleChange} label="Фільтрація по ціні">
                  <MenuItem value={"Новинки"}>Новинки</MenuItem>
                  <MenuItem value={"Дешевше"}>Дешевше</MenuItem>
                  <MenuItem value={"Дорожче"}>Дорожче</MenuItem>
                </Select>
              </FormControl>
            </div>
          </section>
          <div className={styles.categories__main}>
            <Aside />

            <section className={styles.categories__card_list}>
              {isFetching
                ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
                : products && products.map(product => <Card product={product} key={product.id} />)}
            </section>
          </div>
        </div>
      </div>
      <div className={clsx(styles.open_category, { [styles.active]: categoryActive })}>
        <div className={styles.open_category__header}>
          <h1>Фільтрація</h1>
          {ICONS.close({ onClick: () => categoryOpen() })}
        </div>
        <div className={styles.open_category__content}>
          <Aside />
        </div>
      </div>
    </>
  );
};
