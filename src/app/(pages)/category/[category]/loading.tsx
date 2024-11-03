import { Skeleton } from "@mui/material";

import { AsideSkeleton } from "@/components/shared/CategoriesAndSearch/components/Aside/components/AsideSkeleton/AsideSkeleton";

import styles from "../../../../components/shared/CategoriesAndSearch/CategoriesAndSearch.module.scss";

import { SkeletonCard } from "@/components";

export default function Loading() {
  return (
    <div className={styles.categories}>
      <div className={styles.categories__container}>
        <Skeleton className={styles.skeleton__title} variant="rectangular" />
        <section className={styles.categories__subcategories}>
          <Skeleton className={styles.skeleton__subcategory} variant="rectangular" />
        </section>
        <section className={styles.categories__filters}>
          <Skeleton className={styles.skeleton__search} variant="rectangular" />
        </section>
        <section className={styles.categories__main}>
          <AsideSkeleton />
          <div className={styles.categories__card_list}>
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
