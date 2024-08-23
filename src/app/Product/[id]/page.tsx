"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
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
import { ProductList } from "@/app/components/ProductList/ProductList";
import { Counter, MyButton } from "@/components";

export default function Product() {
  return (
    <div className={styles.product}>
      <section className={styles.product__container}>
        <div className={styles.product__img}>
          <Swiper
            style={{
              // @ts-ignore
              "--swiper-navigation-color": "rgb(234, 171, 83)",
              "--swiper-pagination-color": "rgb(234, 171, 83)",
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
            <SwiperSlide key={3} className={styles.product__swiper_slide}>
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
          <Accordion className={styles.product__accordion_no_before}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>ОПИС</AccordionSummary>
            <AccordionDetails>
              <p className={styles.product__about}>
                Ваза Egermann 30 см янтарная 8381 30 28007 85 Ваза Egermann 30 см янтарная 8381 30
                28007 85 Ваза Egermann 30 см янтарная 8381 30 28007 85 Ваза Egermann 30 см янтарная
                8381 30 28007 85 Ваза Egermann 30 см янтарная 8381 30 28007 85 Ваза Egermann 30 см
                янтарная 8381 30 28007 85
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>ХАРАКТЕРИСТИКИ</AccordionSummary>
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
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>ЗАДАТИ ПИТАННЯ</AccordionSummary>
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
      </section>
      <div className={styles.sms__container}>
        <ProductList title="СХОЖІ ТОВАРИ" />
      </div>
    </div>
  );
}
