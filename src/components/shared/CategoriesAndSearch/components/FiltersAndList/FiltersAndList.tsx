import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "../../CategoriesAndSearch.module.scss";
import { Aside } from "../Aside/Aside";

import { Card, Search } from "@/components";

type FiltersAndListProp = {
  product: Product[];
};

export const FiltersAndList: React.FC<FiltersAndListProp> = ({ product }: FiltersAndListProp) => {
  const [sort, setSort] = useState("Новинки");
  const [categoryActive, setCategoryActive] = useState(false);
  const [products, setProducts] = useState<Product[]>(product);

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

        <section className={styles.categories__card_list}>
          {products && products.map(product => <Card product={product} key={product.id} />)}
        </section>
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
