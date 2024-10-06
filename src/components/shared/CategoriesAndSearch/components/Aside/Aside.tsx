"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import { Price } from "../Price/Price";

import styles from "./Aside.module.scss";
import { AsideSkeleton } from "./components/AsideSkeleton/AsideSkeleton";
import { useProductFilterStore } from "@/utils/lib/store/products";

type AsideProp = {
  properties: UniqueProperty[];
  setProperties: Dispatch<SetStateAction<UniqueProperty[]>>;
  minPrice: number;
  maxPrice: number;
  debounced: () => void;
  seIsLoadingProducts: Dispatch<SetStateAction<boolean>>;
};

export const Aside: React.FC<AsideProp> = ({
  properties,
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

  if (isLoading) {
    return <AsideSkeleton />;
  }

  return (
    <aside className={styles.aside}>
      <div className={styles.aside__content}>
        <Accordion className={styles.aside__accordion_no_before}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Ціна</AccordionSummary>
          <AccordionDetails>
            <Price
              minPrice={minPrice}
              maxPrice={maxPrice}
              debounced={debounced}
              seIsLoadingProducts={seIsLoadingProducts}
            />
          </AccordionDetails>
        </Accordion>
        {properties
          .filter(el => el.name !== "Висота (см)")
          .map(property => (
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
