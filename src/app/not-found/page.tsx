"use client";

import Link from "next/link";

import { ICONS } from "@/utils/config/icons";

import styles from "./Error.module.scss";
import { MyButton } from "@/components";

export default function NotFound() {
  return (
    <section className={styles.error__container}>
      <div className={styles.error__left}>
        <h1 className={styles.error__title}>404</h1>
        <h2 className={styles.error__subtitle}>Щось пішло не так...</h2>
        <Link href="/">
          <MyButton>На головну</MyButton>
        </Link>
      </div>
      <div className={styles.error__right}>{ICONS.error()}</div>
    </section>
  );
}
