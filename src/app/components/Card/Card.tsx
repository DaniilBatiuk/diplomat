"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import image from "../../../assets/images/photo.jpg";

import styles from "./Card.module.scss";

export const Card: React.FC = () => {
  const router = useRouter();
  return (
    <figure className={styles.card} onClick={() => router.push(`/Product/1`)}>
      <div className={styles.card__img}>
        <Image width={1280} height={1280} priority={true} src={image} alt={`Image`} />
      </div>
      <figcaption>
        <div className={styles.card__main}>
          <h3 className={styles.card__title}>Ваза Egermann 30 см янтарная 8381 30 28007 85</h3>
          <p className={styles.card__category}>Ваза</p>
          <p className={styles.card__price}>4020 ₴</p>
        </div>
      </figcaption>
    </figure>
  );
};
