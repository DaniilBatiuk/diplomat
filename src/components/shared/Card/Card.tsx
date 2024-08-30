"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { Status } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { patchProductStatus } from "@/utils/lib/actions/product";

import styles from "./Card.module.scss";
import { MyButton } from "@/components";
import { ProductsService } from "@/utils/services/products";

type CardProp = {
  imgClassName?: string;
  product: Product;
};

const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export const Card: React.FC<CardProp> = ({ imgClassName, product }: CardProp) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { mutate: deletePr } = useMutation({
    mutationFn: ProductsService.deleteOneProduct,
    onSuccess: () => {
      toast.success("Продукт був успішно видалено.");
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
      toast.success("Статут був успішно змінений.");
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
            <MyButton className={styles.card__button}>КУПИТИ</MyButton>
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
          sx={{ fontSize: 28, color: "rgb(234, 171, 83)" }}
          onClick={e => e.stopPropagation()}
        />
      )}
    </figure>
  );
};
