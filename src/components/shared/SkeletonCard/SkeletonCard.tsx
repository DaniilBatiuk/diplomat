import { Skeleton } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";

import styles from "./../Card/Card.module.scss";
import image from "@/assets/images/nobg.png";

export const SkeletonCard: React.FC = () => {
  return (
    <figure className={clsx(styles.card, styles.skeleton)}>
      <div className={styles.card__img}>
        <Skeleton className={styles.skeleton__img} variant="rectangular">
          <Image width={1280} height={1280} priority={true} src={image} alt={`Image`} />
        </Skeleton>
      </div>

      <Skeleton className={styles.skeleton__title} variant="rectangular" />

      <Skeleton className={styles.skeleton__category} variant="rectangular" />

      <Skeleton className={styles.skeleton__price} variant="rectangular" />

      <Skeleton className={styles.skeleton__button} variant="rectangular" />
    </figure>
  );
};
