"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import styles from "./Card.module.scss";
import { MyButton } from "@/components";

type CardProp = {
  imgClassName?: string;
  product: Product;
};

export const Card: React.FC<CardProp> = ({ imgClassName, product }: CardProp) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <figure className={styles.card} onClick={() => router.push(`/product/${product.id}`)}>
      <div className={clsx(styles.card__img, imgClassName)}>
        <Image
          width={1280}
          height={1280}
          priority={true}
          src={product.imageUrls[0]}
          alt={`Image`}
        />
      </div>
      <figcaption>
        <div className={styles.card__main}>
          <h3 className={styles.card__title}>{product.name}</h3>
          <p className={styles.card__category}>{product.subcategory.name}</p>
          <p className={styles.card__price}>{product.price} грн</p>
          <MyButton className={styles.card__button}>КУПИТИ</MyButton>
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
            onClick={e => e.stopPropagation()}
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
