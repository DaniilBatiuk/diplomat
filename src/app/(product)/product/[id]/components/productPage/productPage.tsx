"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { OrderStatus } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ICONS } from "@/utils/config/icons";

import styles from "../../Product.module.scss";
import { ProductSkeleton } from "../ProductSkeleton/ProductSkeleton";

import { ProductList } from "@/app/components/ProductList/ProductList";
import { Counter, MyButton } from "@/components";
import { CartItemService } from "@/utils/services/cart-item";
import { ProductsService } from "@/utils/services/products";

type ProductProp = {
  id: string;
};

export const ProductPage: FC<ProductProp> = ({ id }: ProductProp) => {
  const [countSelect, setCountSelect] = useState(1);
  const queryClient = useQueryClient();

  const { data: product, isFetching } = useQuery({
    queryKey: ["product"],
    queryFn: () => ProductsService.getOneProduct(id),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: CartItemService.createCartItem,
    onSuccess: () => {
      toast.success("Товар був успішно доданий до кошику.");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return (
    <div className={styles.product}>
      {isFetching || !product ? (
        <ProductSkeleton />
      ) : (
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
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className={styles.product__swiper}
            >
              {product.imageUrls.map(image => (
                <SwiperSlide key={image} className={styles.product__swiper_slide}>
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
              ))}
            </Swiper>
          </div>
          <div className={styles.product__content}>
            <h1 className={styles.product__name}>{product.name}</h1>
            <h3 className={styles.product__subtitle}>{product.subcategory.name}</h3>
            <div className={styles.product__price_status}>
              <h3 className={styles.product__price}>{product.price} грн</h3>
              <div
                className={clsx({
                  [styles.product__status_bad]: product.orderStatus === OrderStatus.OUT_OF_STOCK,
                  [styles.product__status_ok]: product.orderStatus === OrderStatus.IN_STOCK,
                  [styles.product__status_middle]: product.orderStatus === OrderStatus.TO_ORDER,
                })}
              >
                {product.orderStatus === OrderStatus.IN_STOCK
                  ? "Є в наявності"
                  : product.orderStatus === OrderStatus.OUT_OF_STOCK
                    ? "Немає в наявності"
                    : "Під заказ"}
              </div>
            </div>
            <Accordion className={styles.product__accordion_no_before}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>ОПИС</AccordionSummary>
              <AccordionDetails>
                <p className={styles.product__about}>{product.description}</p>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>ХАРАКТЕРИСТИКИ</AccordionSummary>
              <AccordionDetails>
                <div className={styles.product__list}>
                  {product.properties.map(property => (
                    <div className={styles.product__list_item} key={property.id}>
                      <p className={styles.product__list_characteristic}>{property.name}</p>
                      <p className={styles.product__list_data}> {property.value}</p>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>ЗАДАТИ ПИТАННЯ</AccordionSummary>
              <AccordionDetails>
                <p className={styles.product__accordion_subtitle}>
                  Зв'яжіться з менеджером у чаті або за телефоном:
                </p>
                <address className={styles.product__accordion_contacts}>
                  {ICONS.telegram()}{" "}
                  <div className={styles.product__accordion_tel}>+ 38 (067) 535 05 85</div>
                </address>
              </AccordionDetails>
            </Accordion>

            <div className={styles.product__result}>
              <Counter onChange={setCountSelect} maxCount={product.count} />
              <p>Загалом: {product.price * countSelect} грн</p>
            </div>

            <MyButton
              className={clsx(styles.product__button, {
                [styles.product__button_disable]: isPending,
              })}
              onClick={() => mutate({ productId: product.id, quantity: countSelect })}
              disabled={isPending}
            >
              ДОДАТИ В КОШИК
            </MyButton>
          </div>
        </section>
      )}
      <div className={styles.sms__container}>
        <ProductList title="СХОЖІ ТОВАРИ" id={id} />
      </div>
    </div>
  );
};
