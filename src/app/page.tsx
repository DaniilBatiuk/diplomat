import styles from "./Home.module.scss";
import { CategoriesBox } from "./components/CategoriesBox/CategoriesBox";
import { Faq } from "./components/Faq/Faq";
import { HeaderSection } from "./components/HeaderSection/HeaderSection";

export default function Home() {
  return (
    <>
      {/* <UnderHeader /> */}
      <div className={styles.home__container}>
        <HeaderSection />
        <CategoriesBox />
        {/* <section className={styles.home__categories}>
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
        </section> */}
        {/* <ProductList /> */}
        <Faq />
      </div>
    </>
  );
}
