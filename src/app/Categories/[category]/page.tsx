"use client";

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "./Categories.module.scss";
import { Aside } from "./components/Aside/Aside";
import { Card, Search } from "@/components";

export default function Categories() {
  const [sort, setSort] = useState("Новинки");
  const [category, setCategory] = useState("Всі");
  const [categoryActive, setCategoryActive] = useState(false);
  const [subCategoryActive, setSubCategoryActive] = useState("Всі");

  const categoryOpen = () => {
    setCategoryActive(prev => !prev);
    document.documentElement.classList.toggle("open_category");
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
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
              <Card imgClassName={styles.categories__card_image} />
              <Card imgClassName={styles.categories__card_image} />
              <Card imgClassName={styles.categories__card_image} />
              <Card imgClassName={styles.categories__card_image} />
              <Card imgClassName={styles.categories__card_image} />
              <Card imgClassName={styles.categories__card_image} />
              <Card imgClassName={styles.categories__card_image} />
              <Card imgClassName={styles.categories__card_image} />
              <Card imgClassName={styles.categories__card_image} />
              <Card imgClassName={styles.categories__card_image} />
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
