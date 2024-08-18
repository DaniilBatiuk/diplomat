import Image from "next/image";

import styles from "./Footer.module.scss";
import logo from "@/assets/images/logo.png";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__logo}>
            <Image width={682} height={485} priority={true} src={logo} alt={`Image`} />
          </div>
          <div className={styles.footer__list}>
            <div className={styles.footer__column}>
              <p className={styles.footer__column_title}>Контакти</p>
              <ul className={styles.footer__column_list}>
                <li className={styles.footer__column_item}>+ 38 (067) 535 05 85</li>
                <li className={styles.footer__column_item}>diplomat@gmail.com</li>
              </ul>
            </div>
            <div className={styles.footer__column}>
              <p className={styles.footer__column_title}>Категорії</p>
              <ul className={styles.footer__column_list}>
                <li className={styles.footer__column_item}>Посуд</li>
                <li className={styles.footer__column_item}>Кожа</li>
                <li className={styles.footer__column_item}>Сувеніри</li>
                <li className={styles.footer__column_item}>Вази</li>
                <li className={styles.footer__column_item}>Штучні квіти</li>
                <li className={styles.footer__column_item}>Картини</li>
              </ul>
            </div>
            <div className={styles.footer__column}>
              <p className={styles.footer__column_title}>Додатково</p>
              <ul className={styles.footer__column_list}>
                <li className={styles.footer__column_item}>Про нас</li>
                <li className={styles.footer__column_item}>Політика конфіденційності</li>
                <li className={styles.footer__column_item}>Правила та умови</li>
              </ul>
            </div>
          </div>
        </div>
        <p className={styles.footer__creator}>© 2024 Diplomat</p>
      </div>
    </footer>
  );
};
