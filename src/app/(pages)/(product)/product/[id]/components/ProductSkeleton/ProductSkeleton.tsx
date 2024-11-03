import { Skeleton } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";

import styles from "../../Product.module.scss";

import image from "@/assets/images/nobg.png";

export const ProductSkeleton: React.FC = () => {
  return (
    <div className={clsx(styles.product, styles.skeleton)}>
      <section className={styles.product__container}>
        <div className={styles.product__img}>
          <div className={styles.product__swiper}>
            <div className={styles.product__swiper_slide}>
              <Skeleton className={styles.product__image_box} variant="rectangular">
                <Image
                  width={1280}
                  height={1280}
                  priority={true}
                  src={image}
                  alt={`Image`}
                  className={styles.product__image}
                />
              </Skeleton>
            </div>
          </div>
        </div>
        <div className={styles.product__content}>
          <Skeleton className={styles.skeleton__title} variant="rectangular" />
          <Skeleton className={styles.skeleton__category} variant="rectangular" />
          <Skeleton className={styles.skeleton__price} variant="rectangular" />
          <Skeleton className={styles.skeleton__open} variant="rectangular" />
          <Skeleton className={styles.skeleton__open} variant="rectangular" />
          <Skeleton className={styles.skeleton__open} variant="rectangular" />
          <Skeleton className={styles.skeleton__count} variant="rectangular" />
          <Skeleton className={styles.skeleton__button} variant="rectangular" />
        </div>
      </section>
    </div>
  );
};
