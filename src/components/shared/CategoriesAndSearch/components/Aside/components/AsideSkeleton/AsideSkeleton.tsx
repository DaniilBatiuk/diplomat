import { Skeleton } from "@mui/material";

import styles from "../../Aside.module.scss";

export const AsideSkeleton: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.aside__content}>
        <Skeleton className={styles.aside__skeleton} variant="rectangular" />
        <Skeleton className={styles.aside__skeleton} variant="rectangular" />
        <Skeleton className={styles.aside__skeleton} variant="rectangular" />
        <Skeleton className={styles.aside__skeleton} variant="rectangular" />
        <Skeleton className={styles.aside__skeleton} variant="rectangular" />
        <Skeleton className={styles.aside__skeleton} variant="rectangular" />
      </div>
    </aside>
  );
};
