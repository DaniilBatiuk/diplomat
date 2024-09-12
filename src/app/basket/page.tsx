"use client";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";

import styles from "./Basket.module.scss";
import { FirstStep } from "./components/FirstStep/FirstStep";
import { SecondStep } from "./components/SecondStep/SecondStep";
import { ThirdStep } from "./components/ThirdStep/ThirdStep";
import { CartService } from "@/utils/services/cart";

export default function Basket() {
  const [activeStep, setActiveStep] = useState(0);

  const { data: cart, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.getCart(),
  });

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
            onClick={e => {
              if (cart && cart.items.length > 0) {
                setActiveStep(1);
              }
            }}
          >
            ОФОРМЛЕННЯ
          </h2>
          <h2
            className={clsx(styles.basket__title, {
              [styles.basket__title_active]: activeStep === 2,
            })}
            onClick={e => {
              if (cart && cart.items.length > 0) {
                setActiveStep(2);
              }
            }}
          >
            ОПЛАТА І ДОСТАВКА
          </h2>
        </nav>

        {activeStep === 0 ? (
          <FirstStep cart={cart} isFetching={isFetching} setActiveStep={setActiveStep} />
        ) : activeStep === 1 ? (
          <>
            <SecondStep />
            <div className={styles.basket__buttons_list}>
              <button type="button" onClick={() => setActiveStep(0)}>
                Назад
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className={styles.basket__buttons_list_next}
              >
                Вперед
              </button>
            </div>
          </>
        ) : (
          <>
            <ThirdStep />
            <div className={styles.basket__buttons_list}>
              <button type="button" onClick={() => setActiveStep(1)}>
                Назад
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
