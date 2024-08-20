import Image from "next/image";

import styles from "./UnderHeader.module.scss";
import logo from "@/assets/images/logo.png";

export const UnderHeader: React.FC = () => {
  return (
    <div className={styles.under}>
      <div className={styles.under__container}>
        <div className={styles.under__logo}>
          <Image width={682} height={485} priority={true} src={logo} alt={`Image`} />
        </div>
        <div className={styles.under__contacts}>
          <ul className={styles.under__left_list}>
            <li>+ 38 (067) 535 05 85</li>
            <li>+ 38 (067) 535 09 05</li>
          </ul>
          <div className={styles.under__text}>Пн-Пт з 9:00 до 19:00 </div>
        </div>
        {/* <ul className={styles.under__right_list}>
          <li>Найпопулярніше</li>
          <li>Найдешевше</li>
          <li>Найдорожче</li>
          <li>Зроблено в Україні</li>
        </ul> */}
      </div>
    </div>
  );
};
