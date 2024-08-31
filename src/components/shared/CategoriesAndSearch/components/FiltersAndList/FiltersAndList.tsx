import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import clsx from "clsx";
import { useEffect, useState } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "../../CategoriesAndSearch.module.scss";
import { Aside } from "../Aside/Aside";

import { Card, Search, SkeletonCard } from "@/components";
import { useProductFilterStore } from "@/utils/lib/store/products";

export const FiltersAndList: React.FC = () => {
  const [sort, setSort] = useState("Новинки");
  const [categoryActive, setCategoryActive] = useState(false);

  const fullFilteredProducts = useProductFilterStore(state => state.fullFilteredProducts);
  const isLoading = useProductFilterStore(state => state.isLoading);
  const setFullFilteredProducts = useProductFilterStore(state => state.setFullFilteredProducts);

  useEffect(() => {
    let sortedProducts = [...fullFilteredProducts];

    if (sort === "Новинки") {
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sort === "Дешевше") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "Дорожче") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFullFilteredProducts(sortedProducts);
  }, [sort]);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const categoryOpen = () => {
    setCategoryActive(prev => !prev);
    document.documentElement.classList.toggle("open_category");
  };

  return (
    <>
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
        {!isLoading && fullFilteredProducts.length <= 0 ? (
          <div className={styles.categories__card_list_no_data}>
            На жаль, зараз товару з такою назвою немає.
          </div>
        ) : !isLoading ? (
          <section className={styles.categories__card_list}>
            {fullFilteredProducts.map(product => (
              <Card product={product} key={product.id} />
            ))}
          </section>
        ) : (
          <section className={styles.categories__card_list}>
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </section>
        )}
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
