import { Slider } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import styles from "../Aside/Aside.module.scss";
import { MIN_DISTANCE } from "../Aside/constants";
import { valuetext } from "../Aside/helpers/valuetext";

import { usePriceStore } from "@/utils/lib/store/price";

type PriceProp = {
  minPrice: number;
  maxPrice: number;
  debounced: () => void;
  seIsLoadingProducts: Dispatch<SetStateAction<boolean>>;
};

export const Price: React.FC<PriceProp> = ({
  minPrice,
  maxPrice,
  debounced,
  seIsLoadingProducts,
}: PriceProp) => {
  const price = usePriceStore(state => state.price);
  const setPrice = usePriceStore(state => state.setPrice);

  const handleChangePrice = (event: Event, newValue: number | number[], activeThumb: number) => {
    seIsLoadingProducts(true);
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - MIN_DISTANCE), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + MIN_DISTANCE)]);
    }
    debounced();
  };

  return (
    <div className={styles.aside__price}>
      <div className={styles.aside__price_inputs}>
        <input
          className={styles.aside__price_input}
          type="text"
          onChange={e => {
            seIsLoadingProducts(true);
            if (+e.target.value <= maxPrice) {
              setPrice([Math.min(+e.target.value, price[1] - MIN_DISTANCE), price[1]]);
            }
            if (+e.target.value === 0) {
              setPrice([1, price[1]]);
            }
            debounced();
          }}
          value={price[0]}
        ></input>
        <input
          className={styles.aside__price_input}
          type="text"
          onChange={e => {
            seIsLoadingProducts(true);
            if (+e.target.value <= maxPrice) {
              setPrice([Math.min(price[0], price[1] - MIN_DISTANCE), +e.target.value]);
            }
            if (+e.target.value === 0) {
              setPrice([price[0], 100]);
            }
            debounced();
          }}
          value={price[1]}
        ></input>
      </div>
      <Slider
        min={minPrice}
        max={maxPrice}
        value={price}
        onChange={handleChangePrice}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </div>
  );
};
