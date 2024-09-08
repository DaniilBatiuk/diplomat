"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { Status } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { patchProductStatus } from "@/utils/lib/actions/product";

import styles from "./Card.module.scss";
import { rgbDataURL } from "./helpers/photoHelper";
import { MyButton } from "@/components";
import { CartItemService } from "@/utils/services/cart-item";
import { ProductsService } from "@/utils/services/products";
import { SavedService } from "@/utils/services/saved";

type CardProp = {
  imgClassName?: string;
  product: Product;
};

export const Card: React.FC<CardProp> = ({ imgClassName, product }: CardProp) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { mutate: deletePr } = useMutation({
    mutationFn: ProductsService.deleteOneProduct,
    onSuccess: () => {
      toast.success("Товар був успішно видалено.");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const { mutate: changeStatus } = useMutation({
    mutationFn: patchProductStatus,
    onSuccess: () => {
      toast.success("Статус був успішно змінений.");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const { isPending, mutate: addToBasket } = useMutation({
    mutationFn: CartItemService.createCartItem,
    onSuccess: () => {
      toast.success("Товар був успішно доданий до кошику.");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const { isPending: isPendingSaved, mutate: addToSaved } = useMutation({
    mutationFn: SavedService.createSaved,
    onSuccess: () => {
      toast.success("Товар був успішно збережений.");
      queryClient.invalidateQueries({
        queryKey: ["saved"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return (
    <figure className={styles.card} onClick={() => router.push(`/product/${product.id}`)}>
      <div className={clsx(styles.card__img, imgClassName)}>
        <Image
          width={342}
          height={342}
          priority={true}
          src={product.imageUrls[0]}
          alt={`Image`}
          placeholder="blur"
          blurDataURL={rgbDataURL(255, 237, 212)}
        />
      </div>
      <figcaption>
        <div className={styles.card__main}>
          <h3 className={styles.card__title}>{product.name}</h3>
          <p className={styles.card__category}>{product.subcategory.name}</p>
          <p className={styles.card__price}>{product.price} грн</p>

          {pathname === "/admin" ? (
            <MyButton
              className={clsx(styles.card__button, {
                [styles.card__button_active]: product.status === Status.ACTIVE,
                [styles.card__button_inactive]: product.status === Status.INACTIVE,
              })}
              onClick={e => {
                e.stopPropagation();
                changeStatus(
                  product.status === Status.ACTIVE
                    ? { id: product.id, status: Status.INACTIVE }
                    : { id: product.id, status: Status.ACTIVE },
                );
              }}
            >
              {product.status === Status.ACTIVE ? "ДЕАКТИВУВАТИ" : "АКТИВУВАТИ"}
            </MyButton>
          ) : (
            <MyButton
              className={clsx(styles.card__button, {
                [styles.card__button_disable]: isPending,
              })}
              disabled={isPending}
              onClick={e => {
                e.stopPropagation();
                addToBasket({ productId: product.id, quantity: 1 });
              }}
            >
              КУПИТИ
            </MyButton>
          )}
        </div>
      </figcaption>
      {pathname === "/admin" ? (
        <div className={styles.card__icons}>
          <Link href={`/updateProduct/${product.id}`}>
            <SyncAltIcon
              sx={{ fontSize: 33, color: "rgb(0, 0, 0)" }}
              onClick={e => e.stopPropagation()}
            />
          </Link>
          <DeleteOutlineIcon
            sx={{ fontSize: 33, color: "rgb(0, 0, 0)" }}
            onClick={e => {
              e.stopPropagation();
              deletePr(product.id);
            }}
          />
        </div>
      ) : (
        <FavoriteBorderIcon
          sx={{
            fontSize: 28,
            color: "rgb(234, 171, 83)",
          }}
          className={clsx({
            [styles.card__save]: product.savedItem.find(
              save => save?.saved?.token === Cookies.get("savedToken"),
            ),
          })}
          onClick={e => {
            e.stopPropagation();
            if (!isPendingSaved) {
              addToSaved(product.id);
            }
          }}
        />
      )}
    </figure>
  );
};
