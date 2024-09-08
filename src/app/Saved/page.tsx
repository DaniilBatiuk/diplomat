"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "./Saved.module.scss";
import { Card, SkeletonCard } from "@/components";
import { SavedService } from "@/utils/services/saved";

export default function Saved() {
  const [savedItems, setSavedItems] = useState<Saved | undefined | null>(null);
  const { data: saved } = useQuery({
    queryKey: ["saved"],
    queryFn: () => SavedService.getSaved(),
  });

  useEffect(() => {
    setSavedItems(saved);
  }, [saved]);

  return (
    <section className={styles.saved}>
      <div className={styles.saved__container}>
        <h1>ЗБЕРЕЖЕНІ</h1>

        {savedItems !== null && savedItems && savedItems.savedItems.length <= 0 ? (
          <div className={styles.saved__no_data}>
            <div className={styles.saved__icon}>{ICONS.savedMenu()}</div>
            <p>
              Наразі у вас немає збережених товарів. Коли ви знайдете товар, який вам сподобається,
              ви зможете зберегти його, щоб легко повернутися до нього пізніше. Усі ваші збережені
              товари будуть відображатися в цьому розділі.
            </p>
          </div>
        ) : savedItems === null ? (
          <div className={styles.saved__card_list}>
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className={styles.saved__card_list}>
            {savedItems &&
              savedItems.savedItems.map(product => (
                <Card product={product.product} key={product.id} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
