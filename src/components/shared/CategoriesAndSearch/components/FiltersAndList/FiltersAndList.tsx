import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "../../CategoriesAndSearch.module.scss";
import { Aside } from "../Aside/Aside";

import { Card, Search, SkeletonCard } from "@/components";

type FiltersAndListProp = {
  products: Product[];
  isFetching: boolean;
};

export const FiltersAndList: React.FC<FiltersAndListProp> = ({
  products,
  isFetching,
}: FiltersAndListProp) => {
  const [sort, setSort] = useState("Новинки");
  const [categoryActive, setCategoryActive] = useState(false);

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
        {!isFetching && products.length <= 0 ? (
          <div className={styles.categories__card_list_no_data}>
            На жаль, зараз товару з такою назвою немає.
          </div>
        ) : products.length > 0 ? (
          <section className={styles.categories__card_list}>
            {products.map(product => (
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
