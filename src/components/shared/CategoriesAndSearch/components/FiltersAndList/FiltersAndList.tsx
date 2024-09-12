import clsx from "clsx";
import React, { Dispatch, SetStateAction, useState } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "../../CategoriesAndSearch.module.scss";
import { Aside } from "../Aside/Aside";
import { Sort } from "../Sort/Sort";

import { Card, SkeletonCard } from "@/components";
import { useProductFilterStore } from "@/utils/lib/store/products";

type FiltersAndListProp = {
  setSort: Dispatch<SetStateAction<string>>;
  sort: string;
  properties: UniqueProperty[];
  setProperties: Dispatch<SetStateAction<UniqueProperty[]>>;
  minPrice: number;
  maxPrice: number;
  debounced: () => void;
  isLoadingProducts: boolean;
  seIsLoadingProducts: Dispatch<SetStateAction<boolean>>;
};

export const FiltersAndList: React.FC<FiltersAndListProp> = ({
  setSort,
  sort,
  properties,
  setProperties,
  minPrice,
  maxPrice,
  debounced,
  isLoadingProducts,
  seIsLoadingProducts,
}: FiltersAndListProp) => {
  const [categoryActive, setCategoryActive] = useState(false);

  const fullFilteredProducts = useProductFilterStore(state => state.fullFilteredProducts);
  const isLoading = useProductFilterStore(state => state.isLoading);

  const categoryOpen = () => {
    setCategoryActive(prev => !prev);
    document.documentElement.classList.toggle("open_category");
  };

  return (
    <>
      <Sort
        sort={sort}
        categoryOpen={categoryOpen}
        debounced={debounced}
        setSort={setSort}
        seIsLoadingProducts={seIsLoadingProducts}
      />
      <div className={styles.categories__main}>
        <Aside
          properties={properties}
          setProperties={setProperties}
          maxPrice={maxPrice}
          minPrice={minPrice}
          debounced={debounced}
          seIsLoadingProducts={seIsLoadingProducts}
        />
        {!isLoading && fullFilteredProducts.length <= 0 ? (
          <div className={styles.categories__card_list_no_data}>
            {ICONS.sad()}
            На жаль, зараз товару з такою назвою немає.
          </div>
        ) : !isLoading && !isLoadingProducts ? (
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
          <Aside
            properties={properties}
            setProperties={setProperties}
            maxPrice={maxPrice}
            minPrice={minPrice}
            debounced={debounced}
            seIsLoadingProducts={seIsLoadingProducts}
          />
        </div>
      </div>
    </>
  );
};
