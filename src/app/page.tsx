"use client";

import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

import styles from "./Home.module.scss";
import { Card, Search, UnderHeader } from "@/components";

export default function Home() {
  const [sort, setSort] = useState("Новинки");
  const [category, setCategory] = useState("Всі");
  const categories = ["Вази", "Посуд", "Кожа", "Картини"];

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <>
      <UnderHeader />
      <div className={styles.home}>
        <div className={styles.home__container}>
          <section className={styles.home__filters}>
            <Search className={styles.home__search} />
            <div className={styles.home__selects}>
              <button className={styles.home__filter_button}>
                <TuneOutlinedIcon /> Фільтр
              </button>
              {/* <FormControl
                variant="standard"
                sx={{ minWidth: 140 }}
                className={styles.home__select}
              >
                <InputLabel>Фільтрація по категоріям</InputLabel>
                <Select
                  value={category}
                  onChange={handleChangeCategory}
                  label="Фільтрація по категоріям"
                >
                  <MenuItem value={"Всі"}>Всі</MenuItem>
                  {categories.map(el => (
                    <MenuItem key={el} value={el}>
                      {el}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <FormControl
                variant="standard"
                sx={{ minWidth: 140 }}
                className={styles.home__select}
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
          <section className={styles.home__card_list}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </section>
        </div>
      </div>
    </>
  );
}
