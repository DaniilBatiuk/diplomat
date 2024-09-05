import CloseIcon from "@mui/icons-material/Close";
import { useDebounceCallback } from "@siberiacancode/reactuse";
import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { rgbDataURL } from "@/components/shared/Card/helpers/photoHelper";

import styles from "../../Basket.module.scss";

import { Counter } from "@/components";
import { CartItemService } from "@/utils/services/cart-item";

type ItemProp = {
  item: Item;
  patchCartItem: UseMutateFunction<
    Cart,
    Error,
    {
      id: string;
      quantity: number;
    },
    unknown
  >;
  isPending: boolean;
  isFetching: boolean;
};

export const Item: React.FC<ItemProp> = ({
  item,
  patchCartItem,
  isPending,
  isFetching,
}: ItemProp) => {
  const queryClient = useQueryClient();
  const [count, setCount] = useState(item.quantity);

  const { mutate: deleteCartItem, isPending: isDeleting } = useMutation({
    mutationFn: CartItemService.deleteCartItem,
    onSuccess: () => {
      toast.success("Товар був успішно видалений з кошику.");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (count !== item.quantity) {
      debouncedPatchCartItem();
    }
  }, [count]);

  const debouncedPatchCartItem = useDebounceCallback(
    () => patchCartItem({ id: item.id, quantity: count }),
    500,
  );

  return (
    <div className={clsx(styles.basket__item, { [styles.basket__item_deleting]: isDeleting })}>
      <Link href={`/Product/${item.product.id}`}>
        <div className={styles.basket__img}>
          <Image
            width={1280}
            height={1280}
            priority={true}
            src={item.product.imageUrls[0]}
            alt={`Image`}
            placeholder="blur"
            blurDataURL={rgbDataURL(255, 237, 212)}
            className={styles.basket__image}
          />
        </div>
      </Link>
      <div className={styles.basket__item__content}>
        <Link href="/Product/1">
          <div className={styles.basket__item__title}>{item.product.name}</div>
        </Link>
        <div className={styles.basket__item__counter_price}>
          <Counter maxCount={item.product.count} currentValue={item.quantity} onChange={setCount} />
          <div
            className={clsx(styles.basket__item__price, {
              [styles.basket__item__pending]: isPending || isFetching,
            })}
          >
            {item.product.price * item.quantity} грн
          </div>
        </div>
      </div>
      <CloseIcon className={styles.basket__item__close} onClick={() => deleteCartItem(item.id)} />
    </div>
  );
};
