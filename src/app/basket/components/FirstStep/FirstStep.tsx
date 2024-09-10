import { Skeleton } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "../../Basket.module.scss";
import { Item } from "../Item/Item";

import image from "@/assets/images/empty-box.png";
import { MyButton } from "@/components";
import { CartItemService } from "@/utils/services/cart-item";

type FirstStepProp = {
  cart: Cart | undefined;
  isFetching: boolean;
  setActiveStep: Dispatch<SetStateAction<number>>;
};
export const FirstStep: React.FC<FirstStepProp> = ({
  cart,
  isFetching,
  setActiveStep,
}: FirstStepProp) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const queryClient = useQueryClient();

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
    <>
      {isFirstLoad ? (
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
        <div className="nodata">
          <Image width={150} height={150} priority={true} src={image} alt={`Image`} />
          Кошик порожній
        </div>
      )}
    </>
  );
};
