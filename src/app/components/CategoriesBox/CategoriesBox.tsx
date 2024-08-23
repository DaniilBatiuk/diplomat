import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import image from "../../../assets/images/nobg.png";

import styles from "./CategoriesBox.module.scss";

export const CategoriesBox: React.FC = () => {
  return (
    <section className={styles.categories} id="categories">
      <h1>КАТЕГОРІЇ</h1>
      <div className={styles.categories__list}>
        <Link
          href="/Categories/1"
          className={clsx(styles.categories__item, styles.categories__item_big)}
          //   onClick={() => {
          //     ScrollUp();
          //     dispatch(setTypeName("All"));
          //   }}
        >
          <Image width={1280} height={1280} priority={true} src={image} alt={`Image`} />
          <h2 className={styles.categories__image_text}>VIP Подарунки</h2>
        </Link>

        <Link
          href="/Categories/1"
          className={styles.categories__item}
          //   key={type._id}
          //   onClick={() => {
          //     ScrollUp();
          //     SelectByType(type);
          //   }}
        >
          <Image width={1280} height={1280} priority={true} src={image} alt={`Image`} />
          <h2 className={styles.categories__image_text}>Посуд</h2>
        </Link>
        <Link
          href="/Categories/1"
          className={styles.categories__item}
          //   key={type._id}
          //   onClick={() => {
          //     ScrollUp();
          //     SelectByType(type);
          //   }}
        >
          <Image width={1280} height={1280} priority={true} src={image} alt={`Image`} />
          <h2 className={styles.categories__image_text}>Інтер'єр та декор</h2>
        </Link>
        <Link
          href="/Categories/1"
          className={styles.categories__item}
          //   key={type._id}
          //   onClick={() => {
          //     ScrollUp();
          //     SelectByType(type);
          //   }}
        >
          <Image width={1280} height={1280} priority={true} src={image} alt={`Image`} />
          <h2 className={styles.categories__image_text}>Фігурки та статуетки</h2>
        </Link>
        <Link
          href="/Categories/1"
          className={styles.categories__item}
          //   key={type._id}
          //   onClick={() => {
          //     ScrollUp();
          //     SelectByType(type);
          //   }}
        >
          <Image width={1280} height={1280} priority={true} src={image} alt={`Image`} />
          <h2 className={styles.categories__image_text}>настільні ігри</h2>
        </Link>
      </div>
    </section>
  );
};
