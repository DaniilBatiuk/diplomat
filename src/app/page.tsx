import Image from "next/image";
import Link from "next/link";

import { ICONS } from "@/utils/config/icons";

import styles from "./Home.module.scss";
import { CategoriesBox } from "./components/CategoriesBox/CategoriesBox";
import { Faq } from "./components/Faq/Faq";
import { ProductList } from "./components/ProductList/ProductList";
import logo from "@/assets/images/logo.png";

export default function Home() {
  return (
    <>
      {/* <UnderHeader /> */}
      <div className={styles.home__container}>
        <section className={styles.home__header}>
          <div className={styles.home__header_text}>
            <h1>
              <span className={styles.home__header_text_welcome}>Ласкаво Просимо</span>
              <br />
              До Магазину Подарунків <br />
              <span className={styles.home__header_text_name}>Дипломат</span>
            </h1>
            <div className={styles.home__header_subtitle}>
              <p>Бажаєте зробити незабутній подарунок?</p>
              <p>Тут ви зможете знайти подарунок на будь-який смак.</p>
            </div>
            <div className={styles.home__header_buttons}>
              <Link href="/" className={styles.home__header_how}>
                Як Це Працює?
              </Link>
              <button className={styles.home__header_to_categories}>До Категорій</button>
            </div>
          </div>
          <div className={styles.home__header_logo}>
            <Image width={682} height={485} priority={true} src={logo} alt={`Image`} />
          </div>
        </section>
        <CategoriesBox />

        <section className={styles.home__categories}>
          <h1>КАТЕГОРІЇ</h1>
          <div className={styles.home__categories_list}>
            <Link href="/Categories/Аксесуари" className={styles.categories__item}>
              {ICONS.flower()} АКСЕСУАРИ
            </Link>

            <Link href="/Categories/Фігурки ти статуетки" className={styles.categories__item}>
              {ICONS.rabbit()} ФІГУРКИ ТА СТАТУЕТКИ
            </Link>
            <Link href="/Categories/Посуд" className={styles.categories__item}>
              {ICONS.goblet()} ПОСУД
            </Link>
            <Link href="/Categories/Інтер'єр та декор" className={styles.categories__item}>
              {ICONS.lamp()} ІНТЕР'ЄР ТА ДЕКОР
            </Link>
            <Link href="/Categories/Новорічні іграшки" className={styles.categories__item}>
              {ICONS.christmas()} НОВОРІЧНІ ІГРАШКИ
            </Link>
            <Link href="/Categories/Настільні ігри" className={styles.categories__item}>
              {ICONS.chess()} НАСТІЛЬНІ ІГРИ
            </Link>
            <Link href="/Categories/VIP подарунки" className={styles.categories__item}>
              {ICONS.vip()} VIP ПОДАРУНКИ
            </Link>
          </div>
        </section>
        <ProductList />
        <Faq />
      </div>
    </>
  );
}
