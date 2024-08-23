"use client";

import Image from "next/image";

import { ICONS } from "@/utils/config/icons";

import styles from "../../Home.module.scss";

import logo from "@/assets/images/logo.png";

export const HeaderSection: React.FC = () => {
  return (
    <section className={styles.home__header}>
      <div className={styles.home__header_text}>
        <h1>
          <span className={styles.home__header_text_welcome}>Ласкаво просимо</span>
          <br />
          дім <span className={styles.home__header_text_gift}>П{ICONS.gift()}</span>одарунків <br />
          <span className={styles.home__header_text_name}>Дипломат</span>
        </h1>
        <div className={styles.home__header_subtitle}>
          <p>Бажаєте зробити незабутній подарунок?</p>
          <p>Тут ви зможете знайти подарунок на будь-який смак.</p>
        </div>
        {/* <div className={styles.home__header_buttons}>
          <Link href="/" className={styles.home__header_how}>
            Як Це Працює?
          </Link>
          <button
            className={styles.home__header_to_categories}
            onClick={() =>
              document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            До Категорій
          </button>
        </div> */}
      </div>
      <div className={styles.home__header_logo}>
        <Image width={682} height={485} priority={true} src={logo} alt={`Image`} />
      </div>
    </section>
  );
};
