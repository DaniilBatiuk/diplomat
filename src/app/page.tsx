import styles from "./Home.module.scss";
import { CategoriesBox } from "./components/CategoriesBox/CategoriesBox";
import { Faq } from "./components/Faq/Faq";
import { HeaderSection } from "./components/HeaderSection/HeaderSection";

export default function Home() {
  return (
    <div className={styles.home__container}>
      <HeaderSection />
      <CategoriesBox />
      <Faq />
    </div>
  );
}
