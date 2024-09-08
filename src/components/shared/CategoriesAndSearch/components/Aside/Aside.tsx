"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import styles from "./Aside.module.scss";
import { AsideSkeleton } from "./components/AsideSkeleton/AsideSkeleton";
import { MIN_DISTANCE } from "./constants";
import { valuetext } from "./helpers/valuetext";
import { useProductFilterStore } from "@/utils/lib/store/products";

type AsideProp = {
  price: number[];
  properties: UniqueProperty[];
  setPrice: Dispatch<SetStateAction<number[]>>;
  setProperties: Dispatch<SetStateAction<UniqueProperty[]>>;
  minPrice: number;
  maxPrice: number;
  debounced: () => void;
  seIsLoadingProducts: Dispatch<SetStateAction<boolean>>;
};

export const Aside: React.FC<AsideProp> = ({
  price,
  properties,
  setPrice,
  setProperties,
  minPrice,
  maxPrice,
  debounced,
  seIsLoadingProducts,
}: AsideProp) => {
  const isLoading = useProductFilterStore(state => state.isLoading);

  const handleCheckboxChange = (propertyName: string, value: string) => {
    seIsLoadingProducts(true);
    setProperties(prevProperties =>
      prevProperties.map(property =>
        property.name === propertyName
          ? {
              ...property,
              values: property.values.map(val =>
                val.value === value ? { ...val, isSelected: !val.isSelected } : val,
              ),
            }
          : property,
      ),
    );
    debounced();
  };

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

  if (isLoading) {
    return <AsideSkeleton />;
  }

  return (
    <aside className={styles.aside}>
      <div className={styles.aside__content}>
        <Accordion className={styles.aside__accordion_no_before}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Ціна</AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
        {properties.map(property => (
          <Accordion key={property.name}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>{property.name}</AccordionSummary>
            <AccordionDetails>
              {property.values.map(value => (
                <FormControlLabel
                  className={styles.aside__check_label}
                  key={value.value}
                  control={
                    <Checkbox
                      checked={value.isSelected}
                      onChange={() => handleCheckboxChange(property.name, value.value)}
                      name={value.value}
                    />
                  }
                  label={value.value}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </aside>
  );
};
