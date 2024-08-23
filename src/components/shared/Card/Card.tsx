"use client";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

import image from "../../../assets/images/nobg.png";

import styles from "./Card.module.scss";
import { MyButton } from "@/components";

type CardProp = {
  imgClassName?: string;
};

export const Card: React.FC<CardProp> = ({ imgClassName }: CardProp) => {
  const router = useRouter();
  return (
    <figure className={styles.card} onClick={() => router.push(`/Product/1`)}>
      <div className={clsx(styles.card__img, imgClassName)}>
        <Image width={1280} height={1280} priority={true} src={image} alt={`Image`} />
      </div>
      <figcaption>
        <div className={styles.card__main}>
          <h3 className={styles.card__title}>Ваза Egermann 30 см янтарная 8381 30 28007 85</h3>
          <p className={styles.card__category}>Ваза</p>
          <p className={styles.card__price}>4020 грн</p>
          <MyButton className={styles.card__button}>КУПИТИ</MyButton>
        </div>
      </figcaption>
      <FavoriteBorderIcon
        sx={{ fontSize: 28, color: "rgb(234, 171, 83)" }}
        onClick={e => e.stopPropagation()}
      />
    </figure>
  );
};
