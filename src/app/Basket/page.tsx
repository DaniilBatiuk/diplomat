"use client";

import clsx from "clsx";
import { useState } from "react";

import styles from "./Basket.module.scss";
import { Item } from "./components/Item/Item";
import { MyButton } from "@/components";

export default function Basket() {
  const [resultSum, setResultSum] = useState(999900);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className={styles.basket}>
      <div className={styles.basket__container}>
        <nav className={styles.basket__list_steps}>
          <h1
            className={clsx(styles.basket__title, {
              [styles.basket__title_active]: activeStep === 0,
            })}
            onClick={() => setActiveStep(0)}
          >
            КОШИК
          </h1>
          <h2
            className={clsx(styles.basket__title, {
              [styles.basket__title_active]: activeStep === 1,
            })}
            onClick={() => setActiveStep(1)}
          >
            ОПЛАТА І ДОСТАВКА
          </h2>
        </nav>

        {activeStep === 0 ? (
          <>
            <div className={styles.basket__list}>
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
            </div>
            <div className={styles.basket__result}>
              <p>Сума до сплати:</p>{" "}
              <div className={styles.basket__result_sum}>{resultSum} грн</div>
            </div>
            <div className={styles.basket__button_div}>
              <MyButton className={styles.basket__button} onClick={() => setActiveStep(1)}>
                ОФОРМИТИ ЗАМОВЛЕННЯ
              </MyButton>
            </div>
          </>
        ) : (
          <div> ОПЛАТА І ДОСТАВКА</div>
        )}
      </div>
    </section>
  );
}
