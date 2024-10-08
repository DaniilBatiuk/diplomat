import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import image from "../../../assets/images/nobg.png";

import styles from "./CategoriesBox.module.scss";

export const CategoriesBox: React.FC = () => {
  return (
    <section className={styles.categories} id="categories">
      <h2>КАТЕГОРІЇ</h2>
      <div className={styles.categories__list}>
        <Link
          href="/category/VIP Подарунки?subcategory=Всі"
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
          href="/category/Посуд?subcategory=Всі"
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
          href="/category/Інтер'єр та декор?subcategory=Всі"
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
          href="/category/Фігурки та статуетки?subcategory=Всі"
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
          href="/category/Настільні ігри?subcategory=Всі"
          className={styles.categories__item}
          //   key={type._id}
          //   onClick={() => {
          //     ScrollUp();
          //     SelectByType(type);
          //   }}
        >
          <Image width={1280} height={1280} priority={true} src={image} alt={`Image`} />
          <h2 className={styles.categories__image_text}>Настільні ігри</h2>
        </Link>
      </div>
    </section>
  );
};
