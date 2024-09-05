import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "../../CategoriesAndSearch.module.scss";
import { Aside } from "../Aside/Aside";

import { Card, Search, SkeletonCard } from "@/components";
import { useProductFilterStore } from "@/utils/lib/store/products";

type FiltersAndListProp = {
  price: number[];
  setSort: Dispatch<SetStateAction<string>>;
  sort: string;
  properties: UniqueProperty[];
  setPrice: Dispatch<SetStateAction<number[]>>;
  setProperties: Dispatch<SetStateAction<UniqueProperty[]>>;
  minPrice: number;
  maxPrice: number;
  debounced: () => void;
};

export const FiltersAndList: React.FC<FiltersAndListProp> = ({
  price,
  setSort,
  sort,
  properties,
  setPrice,
  setProperties,
  minPrice,
  maxPrice,
  debounced,
}: FiltersAndListProp) => {
  const [categoryActive, setCategoryActive] = useState(false);

  const fullFilteredProducts = useProductFilterStore(state => state.fullFilteredProducts);
  const isLoading = useProductFilterStore(state => state.isLoading);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
    debounced();
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
      <div className={styles.categories__main}>
        {fullFilteredProducts.length > 0 && (
          <Aside
            sort={sort}
            properties={properties}
            price={price}
            setPrice={setPrice}
            setProperties={setProperties}
            maxPrice={maxPrice}
            minPrice={minPrice}
            debounced={debounced}
          />
        )}
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
          {fullFilteredProducts.length > 0 && (
            <Aside
              sort={sort}
              properties={properties}
              price={price}
              setPrice={setPrice}
              setProperties={setProperties}
              maxPrice={maxPrice}
              minPrice={minPrice}
              debounced={debounced}
            />
          )}
        </div>
      </div>
    </>
  );
};
