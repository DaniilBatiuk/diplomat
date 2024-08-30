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
import { useProductFilterStore } from "@/utils/lib/store/products";

const minDistance = 1;

function valuetext(value: number) {
  return `${value}`;
}

export const Aside: React.FC = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [price, setPrice] = useState<number[]>([0, 0]);

  const setFullFilteredProducts = useProductFilterStore(state => state.setFullFilteredProducts);
  const filteredProductsByCategoryAndSub = useProductFilterStore(
    state => state.filteredProductsByCategoryAndSub,
  );

  const filterProducts = () => {
    setFullFilteredProducts(
      filteredProductsByCategoryAndSub.filter(
        product => product.price >= price[0] && product.price <= price[1],
      ),
    );
  };

  const debouncedPrice = useDebounceCallback(filterProducts, 500);

  useEffect(() => {
    debouncedPrice();
  }, [price]);

  useEffect(() => {
    if (filteredProductsByCategoryAndSub.length > 0) {
      setPrice([
        Math.min(...filteredProductsByCategoryAndSub.map(product => product.price)),
        Math.max(...filteredProductsByCategoryAndSub.map(product => product.price)),
      ]);
      setMinPrice(Math.min(...filteredProductsByCategoryAndSub.map(product => product.price)));
      setMaxPrice(Math.max(...filteredProductsByCategoryAndSub.map(product => product.price)));
    }
  }, [filteredProductsByCategoryAndSub]);

  const [manufacturer, setManufacturer] = useState({
    "Виробник 1": false,
    "Виробник 2 длинный очень и очень длинный название": false,
    "Виробник 3": false,
  });

  const [manufacturerCountry, setManufacturerCountry] = useState({
    Китай: false,
    Україна: false,
    США: false,
  });

  const [materials, setMaterials] = useState({
    Скло: false,
    Пісок: false,
    Цемент: false,
  });

  const [quantityInTheSet, setQuantityInTheSet] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const handleChangePrice = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };

  const handleChangeManufacturer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManufacturer({
      ...manufacturer,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeManufacturerCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManufacturerCountry({
      ...manufacturerCountry,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeMaterials = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaterials({
      ...materials,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeQuantityInTheSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantityInTheSet({
      ...quantityInTheSet,
      [event.target.name]: event.target.checked,
    });
  };

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
                      setPrice([Math.min(+e.target.value, price[1] - minDistance), price[1]]);
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
                      setPrice([Math.min(price[0], price[1] - minDistance), +e.target.value]);
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
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Виробник</AccordionSummary>
          <AccordionDetails>
            {Object.entries(manufacturer).map(([key, value]) => (
              <FormControlLabel
                className={styles.aside__check_label}
                key={key}
                control={
                  <Checkbox checked={value} onChange={handleChangeManufacturer} name={key} />
                }
                label={key}
              />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Країна виробник</AccordionSummary>
          <AccordionDetails>
            {Object.entries(manufacturerCountry).map(([key, value]) => (
              <FormControlLabel
                className={styles.aside__check_label}
                key={key}
                control={
                  <Checkbox checked={value} onChange={handleChangeManufacturerCountry} name={key} />
                }
                label={key}
              />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Матеріали</AccordionSummary>
          <AccordionDetails>
            {Object.entries(materials).map(([key, value]) => (
              <FormControlLabel
                className={styles.aside__check_label}
                key={key}
                control={<Checkbox checked={value} onChange={handleChangeMaterials} name={key} />}
                label={key}
              />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Кількість в наборі</AccordionSummary>
          <AccordionDetails>
            {Object.entries(quantityInTheSet).map(([key, value]) => (
              <FormControlLabel
                className={styles.aside__check_label}
                key={key}
                control={
                  <Checkbox checked={value} onChange={handleChangeQuantityInTheSet} name={key} />
                }
                label={key}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </aside>
  );
};
