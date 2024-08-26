"use client";

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "./Categories.module.scss";
import { Aside } from "./components/Aside/Aside";
import { Card, Search, SkeletonCard } from "@/components";
import { ProductsService } from "@/utils/services/products";

export default function Categories() {
  const [sort, setSort] = useState("Новинки");

  const [categoryActive, setCategoryActive] = useState(false);
  const [subCategoryActive, setSubCategoryActive] = useState("Всі");
  const [products, setProducts] = useState<Product[]>([]);

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
          <h1 className={styles.categories__title}>ПОСУД</h1>
          <section className={styles.categories__subcategories}>
            <div
              className={clsx(styles.categories__subcategories_item, {
                [styles.active]: subCategoryActive === "Всі",
              })}
              onClick={() => setSubCategoryActive("Всі")}
            >
              Всі
            </div>
            <div
              className={clsx(styles.categories__subcategories_item, {
                [styles.active]: subCategoryActive === "Вази",
              })}
              onClick={() => setSubCategoryActive("Вази")}
            >
              Вази
            </div>
            <div
              className={clsx(styles.categories__subcategories_item, {
                [styles.active]: subCategoryActive === "Сервізи",
              })}
              onClick={() => setSubCategoryActive("Сервізи")}
            >
              Сервізи
            </div>
            <div
              className={clsx(styles.categories__subcategories_item, {
                [styles.active]: subCategoryActive === "Чашки",
              })}
              onClick={() => setSubCategoryActive("Чашки")}
            >
              Чашки
            </div>
            <div
              className={clsx(styles.categories__subcategories_item, {
                [styles.active]: subCategoryActive === "Кружки",
              })}
              onClick={() => setSubCategoryActive("Кружки")}
            >
              Кружки
            </div>
            <div
              className={clsx(styles.categories__subcategories_item, {
                [styles.active]: subCategoryActive === "Вилки",
              })}
              onClick={() => setSubCategoryActive("Вилки")}
            >
              Вилки
            </div>
            <div
              className={clsx(styles.categories__subcategories_item, {
                [styles.active]: subCategoryActive === "Тарілки",
              })}
              onClick={() => setSubCategoryActive("Тарілки")}
            >
              Тарілки
            </div>
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
                : products && products.map(product => <Card product={product} />)}
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
}
