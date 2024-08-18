import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";

import styles from "../../Basket.module.scss";

import image from "@/assets/images/ph.png";
import { Counter } from "@/components";

export const Item: React.FC = () => {
  return (
    <div className={styles.basket__item}>
      <Link href="/Product/1">
        <div className={styles.basket__img}>
          <Image
            width={1280}
            height={1280}
            priority={true}
            src={image}
            alt={`Image`}
            className={styles.basket__image}
          />
        </div>
      </Link>
      <div className={styles.basket__item__content}>
        <Link href="/Product/1">
          <div className={styles.basket__item__title}>
            Ваза Egermann 30 см янтарная 8381 30 28007 85 Ваза Egermann 30 см Egermann 30 см
            янтарная 8381 30 28007 85
          </div>
        </Link>
        <div className={styles.basket__item__counter_price}>
          <Counter />
          <div className={styles.basket__item__price}>5105 грн</div>
        </div>
      </div>
      <CloseIcon className={styles.basket__item__close} />
    </div>
  );
};
