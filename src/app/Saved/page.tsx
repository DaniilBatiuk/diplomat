import { ICONS } from "@/utils/config/icons";

import styles from "./Saved.module.scss";
import { Card } from "@/components";

export default function Saved() {
  return (
    <section className={styles.saved}>
      <div className={styles.saved__container}>
        <h1>ЗБЕРЕЖЕНІ</h1>
        {0 < 2 ? (
          <div className={styles.saved__no_data}>
            <div className={styles.saved__icon}>{ICONS.savedMenu()}</div>
            <p>
              Наразі у вас немає збережених товарів. Коли ви знайдете товар, який вам сподобається,
              ви зможете зберегти його, щоб легко повернутися до нього пізніше. Усі ваші збережені
              товари будуть відображаються в цьому розділі.
            </p>
          </div>
        ) : (
          <div className={styles.saved__card_list}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        )}
      </div>
    </section>
  );
}
