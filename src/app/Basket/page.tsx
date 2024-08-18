"use client";

import { useState } from "react";

import styles from "./Basket.module.scss";
import { Item } from "./components/Item/Item";

export default function Basket() {
  const [resultSum, setResultSum] = useState(0);

  return (
    <section className={styles.basket}>
      <div className={styles.basket__container}>
        <h1 className={styles.basket__title}>Кошик</h1>
        <div className={styles.basket__list}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
        <div className={styles.basket__result}>
          <p>Сума до сплати:</p> <div className={styles.basket__result_sum}>{resultSum} грн</div>
        </div>
        <div className={styles.basket__button_div}>
          <button className={styles.basket__button}>Оформити замовлення</button>
        </div>
      </div>
    </section>
  );
}
