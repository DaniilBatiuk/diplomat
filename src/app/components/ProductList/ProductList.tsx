"use client";

import clsx from "clsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { breakPoints } from "./constants";
import { Card } from "@/components";

type ProductListProp = {
  title?: string;
  similarProducts: Product[];
};

export const ProductList: React.FC<ProductListProp> = ({
  title,
  similarProducts,
}: ProductListProp) => {
  if (similarProducts.length === 0) {
    return <></>;
  }
  return (
    <section className={clsx("home__list_item", { ["home__list_item_margin"]: title })}>
      <h2>{title ? title : "РЕКОМЕНДОВАНЕ"}</h2>
      <Swiper
        style={{
          // @ts-ignore
          "--swiper-navigation-color": "rgb(234, 171, 83)",
          "--swiper-pagination-color": "rgb(234, 171, 83)",
        }}
        modules={[Navigation]}
        navigation
        slidesPerView={4}
        spaceBetween={30}
        breakpoints={breakPoints}
      >
        {similarProducts.map(product => (
          <SwiperSlide key={product.id}>
            <Card product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
