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
import { useDebounceCallback } from "@siberiacancode/reactuse";
import { useEffect, useState } from "react";

import styles from "./Aside.module.scss";
import { AsideSkeleton } from "./components/AsideSkeleton/AsideSkeleton";
import { MIN_DISTANCE } from "./constants";
import { transformToUniqueProperties } from "./helpers/transformToUniqueProperties";
import { valuetext } from "./helpers/valuetext";
import { useProductFilterStore } from "@/utils/lib/store/products";

export const Aside: React.FC = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [price, setPrice] = useState<number[]>([0, 0]);
  const [properties, setProperties] = useState<UniqueProperty[]>([]);

  const isLoading = useProductFilterStore(state => state.isLoading);
  const setFullFilteredProducts = useProductFilterStore(state => state.setFullFilteredProducts);
  const filteredProductsByCategoryAndSub = useProductFilterStore(
    state => state.filteredProductsByCategoryAndSub,
  );

  const filterProducts = () => {
    setFullFilteredProducts(
      filteredProductsByCategoryAndSub.filter(product => {
        // Filter by price range
        const isWithinPriceRange = product.price >= price[0] && product.price <= price[1];

        // Filter by selected properties
        const isMatchingProperties = properties.every(property => {
          // Get selected values for the property
          const selectedValues = property.values
            .filter(value => value.isSelected)
            .map(value => value.value);

          // If no values are selected, skip this property in filtering
          if (selectedValues.length === 0) return true;

          // Check if the product has a matching property with a selected value
          return product.properties.some(
            prodProp => prodProp.name === property.name && selectedValues.includes(prodProp.value),
          );
        });

        return isWithinPriceRange && isMatchingProperties;
      }),
    );
  };

  const handleCheckboxChange = (propertyName: string, value: string) => {
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
  };

  const debouncedPrice = useDebounceCallback(filterProducts, 500);

  useEffect(() => {
    debouncedPrice();
  }, [price, properties]);

  useEffect(() => {
    if (filteredProductsByCategoryAndSub.length > 0) {
      setPrice([
        Math.min(...filteredProductsByCategoryAndSub.map(product => product.price)),
        Math.max(...filteredProductsByCategoryAndSub.map(product => product.price)),
      ]);
      setMinPrice(Math.min(...filteredProductsByCategoryAndSub.map(product => product.price)));
      setMaxPrice(Math.max(...filteredProductsByCategoryAndSub.map(product => product.price)));
    }

    setProperties(transformToUniqueProperties(filteredProductsByCategoryAndSub));
  }, [filteredProductsByCategoryAndSub]);

  const handleChangePrice = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - MIN_DISTANCE), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + MIN_DISTANCE)]);
    }
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
                    if (+e.target.value <= maxPrice) {
                      setPrice([Math.min(+e.target.value, price[1] - MIN_DISTANCE), price[1]]);
                    }
                    if (+e.target.value === 0) {
                      setPrice([1, price[1]]);
                    }
                  }}
                  value={price[0]}
                ></input>
                <input
                  className={styles.aside__price_input}
                  type="text"
                  onChange={e => {
                    if (+e.target.value <= maxPrice) {
                      setPrice([Math.min(price[0], price[1] - MIN_DISTANCE), +e.target.value]);
                    }
                    if (+e.target.value === 0) {
                      setPrice([price[0], 100]);
                    }
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
