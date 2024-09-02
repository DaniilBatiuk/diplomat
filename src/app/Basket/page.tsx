"use client";

import { Skeleton } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./Basket.module.scss";
import { Item } from "./components/Item/Item";
import { MyButton } from "@/components";
import { CartService } from "@/utils/services/cart";
import { CartItemService } from "@/utils/services/cart-item";

export default function Basket() {
  const [activeStep, setActiveStep] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const queryClient = useQueryClient();

  const { data: cart, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.getCart(),
  });

  const { mutate: patchCartItem, isPending } = useMutation({
    mutationFn: CartItemService.patchCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!isFetching && cart) setIsFirstLoad(false);
  }, [isFetching, cart]);

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
            ОПЛАТА І ДОСТАВКА
          </h2>
        </nav>

        {activeStep === 0 ? (
          isFirstLoad ? (
            <div className={styles.basket__list}>
              <Skeleton variant="rectangular" className={styles.basket__skeleton_item} />
              <Skeleton variant="rectangular" className={styles.basket__skeleton_item} />
              <Skeleton variant="rectangular" className={styles.basket__skeleton_item} />
              <Skeleton variant="rectangular" className={styles.basket__skeleton_item} />
            </div>
          ) : cart && cart.items.length > 0 ? (
            <>
              <div className={styles.basket__list}>
                {cart.items.map(item => (
                  <Item
                    item={item}
                    key={item.id}
                    patchCartItem={patchCartItem}
                    isFetching={isFetching}
                    isPending={isPending}
                  />
                ))}
              </div>
              <div className={styles.basket__result}>
                <p>Сума до сплати:</p>{" "}
                <div
                  className={clsx(styles.basket__result_sum, {
                    [styles.basket__item__pending]: isFetching || isPending,
                  })}
                >
                  {cart.totalPrice} грн
                </div>
              </div>
              <div className={styles.basket__button_div}>
                <MyButton className={styles.basket__button} onClick={() => setActiveStep(1)}>
                  ОФОРМИТИ ЗАМОВЛЕННЯ
                </MyButton>
              </div>
            </>
          ) : (
            <div className="loader">Кошик порожній</div>
          )
        ) : (
          <div> ОПЛАТА І ДОСТАВКА</div>
        )}
      </div>
    </section>
  );
}
