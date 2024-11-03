import styles from "./about-us.module.scss";

export default async function AboutUs() {
  return (
    <section className={styles.about}>
      <div className={styles.about__container}>
        <h1 className={styles.about__title}>ПРО НАС</h1>
        <div className={styles.about__text}>
          <p>
            "Дипломат" – це інтернет-магазин, де ви знайдете подарунок на будь-який смак. В нашому
            багатому асортименті тільки найбільш ходові види подарунків, серед яких багато гарної
            ексклюзивної продукції. Ми прагнемо, щоб кожен подарунок був особливим та приносив
            радість, тому ретельно обираємо асортимент, щоб задовольнити найрізноманітніші
            вподобання наших клієнтів.
          </p>
          <br />
          <p>
            Ми починали свою діяльність у місті Кременчук, але зараз перейшли до онлайн-формату, щоб
            стати ще ближчими до вас – незалежно від того, де ви знаходитесь в Україні.
          </p>
          <br />
          <p>
            Перехід в онлайн дозволяє нам ще швидше допомагати вам з вибором і надавати якісний
            сервіс. Дякуємо, що обираєте нас, і завжди раді зробити ваші моменти незабутніми!
          </p>
        </div>
      </div>
    </section>
  );
}