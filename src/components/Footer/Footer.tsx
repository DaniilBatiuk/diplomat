import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__end}>
          <p className={styles.footer__creator}>Created by Daniil Batiuk</p>
          <p className={styles.footer__year}>build with love</p>
        </div>
      </div>
    </footer>
  );
};