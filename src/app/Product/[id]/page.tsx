"use client";

import { TextField } from "@mui/material";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import image2 from "../../../assets/images/photo2.webp";
import image3 from "../../../assets/images/photo3.jpg";
import image from "../../../assets/images/photo.jpg";

import styles from "./Product.module.scss";

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
            <h3 className={styles.product__price}>2440 ₴</h3>
            <div className={styles.product__status_bad}>Немає в наявності</div>
          </div>
          <p className={styles.product__about}>
            Ваза Egermann 30 см янтарная 8381 30 28007 85 Ваза Egermann 30 см янтарная 8381 30 28007
            85 Ваза Egermann 30 см янтарная 8381 30 28007 85 Ваза Egermann 30 см янтарная 8381 30
            28007 85 Ваза Egermann 30 см янтарная 8381 30 28007 85 Ваза Egermann 30 см янтарная 8381
            30 28007 85
          </p>
          <div className={styles.product__characteristics}>Характеристики</div>
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
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага Вага Вага Вага</p>
              <p className={styles.product__list_data}>
                Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага Вага
                Вага Вага Вага Вага Вага Вага Вага Вага
              </p>
            </div>
            <div className={styles.product__list_item}>
              <p className={styles.product__list_characteristic}>Вага</p>
              <p className={styles.product__list_data}>Вага Вага Вага Вага Вага Вага</p>
            </div>
          </div>

          <div className={styles.product__result}>
            {" "}
            <TextField
              className={styles.product__field}
              label="Кількість"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              fullWidth
              defaultValue={1}
            />
            <p>Усього: 2440 ₴</p>
          </div>

          <button className={styles.product__button}>Додати в кошик</button>
        </div>
      </div>
    </section>
  );
}
