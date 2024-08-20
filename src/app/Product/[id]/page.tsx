"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ICONS } from "@/utils/config/icons";

import image2 from "../../../assets/images/nobg.png";
import image3 from "../../../assets/images/ph.png";
import image from "../../../assets/images/photo2.webp";

import styles from "./Product.module.scss";
import { Counter, MyButton } from "@/components";

export default function Product() {
  return (
    <section className={styles.product}>
      <div className={styles.product__container}>
        <div className={styles.product__img}>
          <Swiper
            style={{
              // @ts-ignore
              "--swiper-navigation-color": "#000000",
              "--swiper-pagination-color": "#000000",
            }}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={styles.product__swiper}
          >
            <SwiperSlide key={1} className={styles.product__swiper_slide}>
              <div className={styles.product__image_box}>
                <Image
                  width={1280}
                  height={1280}
                  priority={true}
                  src={image2}
                  alt={`Image`}
                  className={styles.product__image}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide key={2} className={styles.product__swiper_slide}>
              <div className={styles.product__image_box}>
                <Image
                  width={1280}
                  height={1280}
                  priority={true}
                  src={image3}
                  alt={`Image`}
                  className={styles.product__image}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide key={2} className={styles.product__swiper_slide}>
              <div className={styles.product__image_box}>
                <Image
                  width={1280}
                  height={1280}
                  priority={true}
                  src={image}
                  alt={`Image`}
                  className={styles.product__image}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={styles.product__content}>
          <h1 className={styles.product__name}>Ваза Egermann 30 см янтарная 8381 30 28007 85</h1>
          <h3 className={styles.product__subtitle}>Ваза</h3>
          <div className={styles.product__price_status}>
            <h3 className={styles.product__price}>2440 грн</h3>
            <div className={styles.product__status_bad}>Немає в наявності</div>
          </div>
          <Accordion
            className={clsx(styles.product__accordion_no_before, styles.product__accordion)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={styles.product__accordion_title}
            >
              ОПИС
            </AccordionSummary>
            <AccordionDetails>
              <p className={styles.product__about}>
                Ваза Egermann 30 см янтарная 8381 30 28007 85 Ваза Egermann 30 см янтарная 8381 30
                28007 85 Ваза Egermann 30 см янтарная 8381 30 28007 85 Ваза Egermann 30 см янтарная
                8381 30 28007 85 Ваза Egermann 30 см янтарная 8381 30 28007 85 Ваза Egermann 30 см
                янтарная 8381 30 28007 85
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion className={styles.product__accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={styles.product__accordion_title}
            >
              ХАРАКТЕРИСТИКИ
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.product__list}>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>
                    Вага Вага Вага Вага Вагаaaas Вага Вага Вага Вагаaasss
                  </p>
                  <p className={styles.product__list_data}>Вага Вага Вага Вага Вага</p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>
                    Вага Вага Вага Вага Вагаaasss Вага Вага Вага Вагаaasssss
                  </p>
                  <p className={styles.product__list_data}>Вага Вага Вага Вага Вага</p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
                  <p className={styles.product__list_data}>
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                    Вага Вага Вага Вага Вага Вага Вага Вага Вага
                  </p>
                </div>
                <div className={styles.product__list_item}>
                  <p className={styles.product__list_characteristic}>Вага</p>
                  <p className={styles.product__list_data}>Вага Вага Вага Вага Вага Вага</p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion className={styles.product__accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={styles.product__accordion_title}
            >
              ЗАДАТИ ПИТАННЯ
            </AccordionSummary>
            <AccordionDetails>
              <p className={styles.product__accordion_subtitle}>
                Зв'яжіться з менеджером у чаті або за телефоном:
              </p>
              <div className={styles.product__accordion_contacts}>
                {ICONS.telegram()}{" "}
                <div className={styles.product__accordion_tel}>+ 38 (067) 535 05 85</div>
              </div>
            </AccordionDetails>
          </Accordion>

          <div className={styles.product__result}>
            <Counter />
            <p>Загалом: 2440 грн</p>
          </div>

          <MyButton className={styles.product__button}>ДОДАТИ В КОШИК</MyButton>
        </div>
      </div>
    </section>
  );
}
