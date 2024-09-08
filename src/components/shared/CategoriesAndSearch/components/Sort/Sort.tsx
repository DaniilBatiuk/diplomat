import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";

import { Search } from "@/components/shared/Search/Search";

import styles from "../../CategoriesAndSearch.module.scss";

import { useProductFilterStore } from "@/utils/lib/store/products";

type SortProp = {
  setSort: Dispatch<SetStateAction<string>>;
  sort: string;
  debounced: () => void;
  seIsLoadingProducts: Dispatch<SetStateAction<boolean>>;
  categoryOpen: () => void;
};

export const Sort: React.FC<SortProp> = ({
  sort,
  categoryOpen,
  seIsLoadingProducts,
  setSort,
  debounced,
}: SortProp) => {
  const handleChange = (event: SelectChangeEvent) => {
    seIsLoadingProducts(true);
    setSort(event.target.value as string);
    debounced();
  };
  const fullFilteredProducts = useProductFilterStore(state => state.fullFilteredProducts);

  return (
    <section className={styles.categories__filters}>
      <Search className={styles.categories__search} />
      <div className={styles.categories__selects}>
        <button
          className={clsx(styles.categories__filter_button, {
            [styles.categories__filter_button_disable]: fullFilteredProducts.length < 2,
          })}
          onClick={categoryOpen}
          disabled={fullFilteredProducts.length < 2}
        >
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
  );
};
