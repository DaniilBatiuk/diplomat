import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__creator}>© 2024 Diplomat</p>
      </div>
    </footer>
  );
};
