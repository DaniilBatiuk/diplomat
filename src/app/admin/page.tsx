"use client";

import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { ICONS } from "@/utils/config/icons";
import { LINKS } from "@/utils/config/pages-url.config";

import styles from "./Admin.module.scss";
import { Card } from "@/components";
import { ProductsService } from "@/utils/services/products";

export default function Admin() {
  const { data: products, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: ProductsService.getAllProducts,
  });

  if (isFetching) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <section className={styles.admin}>
      <div className={styles.admin__container}>
        <h1>АДМІН</h1>
        <Link href={LINKS.CREATEPRODUCT} className={styles.admin__create}>
          Створити продукт
        </Link>

        {products && products.length < 0 ? (
          <div className={styles.admin__no_data}>
            <div className={styles.admin__icon}>{ICONS.savedMenu()}</div>
            <p>Наразі товарів немає.</p>
          </div>
        ) : (
          <div className={styles.admin__card_list}>
            {products && products.map(product => <Card product={product} />)}
          </div>
        )}
      </div>
    </section>
  );
}
