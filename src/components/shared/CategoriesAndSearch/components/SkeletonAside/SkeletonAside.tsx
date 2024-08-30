import { Skeleton } from "@mui/material";

import styles from "../Aside/Aside.module.scss";

export const SkeletonAside: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <Skeleton className={styles.skeleton__aside} variant="rectangular"></Skeleton>
    </aside>
  );
};
