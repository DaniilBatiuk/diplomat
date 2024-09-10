"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { OrderStatus } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { createProduct } from "@/utils/lib/actions/product";

import { ProductScheme } from "@/utils/lib/validators/product-validator";

import { CreateCategory } from "./CreateCategory/CreateCategory";
import { CreateSubCategory } from "./CreateSubCategory/CreateSubCategory";
import { Photo } from "./Photo/Photo";
import styles from "./createProduct.module.scss";
import { CategoriesService } from "@/utils/services/categories";
import { PropertiesService } from "@/utils/services/property";
import { SubcategoriesService } from "@/utils/services/subcategories";

export default function CreateProduct() {
  const [categoryId, setCategoryId] = useState("");
  const [photos, setPhotos] = useState<{ id: string; url: string }[]>([]);
  const [activeModalCreateCategory, setActiveModalCreateCategory] = useState(false);
  const [activeModalSubCreateCategory, setActiveModalSubCreateCategory] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesService.getAllCategories,
  });

  const { data: subcategories, refetch } = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => SubcategoriesService.getAllSubcategories(categoryId),
  });

  const { data: subcategoriesProperties, refetch: refreshSubcategoriesProperties } = useQuery({
    queryKey: ["subcategoriesProperties"],
    queryFn: () => PropertiesService.getAllPropertyToSubcategory(subcategoryId),
  });

  useEffect(() => {
    refetch();
  }, [categoryId]);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value as string);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<CreateProduct>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      count: 1,
      subcategoryId: "",
      orderStatus: OrderStatus.IN_STOCK,
      imageUrls: [],
      properties: [],
    },
    mode: "onBlur",
    resolver: zodResolver(ProductScheme),
  });

  const subcategoryId = watch("subcategoryId");

  useEffect(() => {
    refreshSubcategoriesProperties();
  }, [subcategoryId]);

  useEffect(() => {
    if (
      getValues("subcategoryId") !== "" &&
      subcategoriesProperties &&
      subcategoriesProperties.length > 0
    ) {
      for (let data of subcategoriesProperties) {
        propertyAppend({
          name: data.name,
          value: "",
        });
      }
    }
  }, [subcategoriesProperties]);

  const {
    fields: propertyFields,
    append: propertyAppend,
    remove: propertyRemove,
  } = useFieldArray({ control, name: `properties` });

  const onSubmit: SubmitHandler<CreateProduct> = async data => {
    if (photos.length < 1) {
      toast.error("Має бути як мінімум 1 фото.");
      return;
    }
    const res = {
      ...data,
      imageUrls: photos.map(photo => photo.url),
      properties: data.properties
        .filter(el => el.value !== "")
        .map(el => ({
          name: el.name.trim().charAt(0).toUpperCase() + el.name.trim().slice(1),
          value: el.value.trim().charAt(0).toUpperCase() + el.value.trim().slice(1),
        })),
    };
    mutate(res);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Товар був успішно створений.");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      router.push(`/admin`);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return (
    <section className={styles.create}>
      <div className={styles.create__container}>
        <h1>СТВОРИТИ ПРОДУКТ</h1>

        <form className={styles.create__main} onSubmit={handleSubmit(onSubmit)}>
          <h3>Основні поля</h3>
          <TextField
            variant="standard"
            fullWidth
            className={styles.create__field}
            {...register(`name`)}
            error={Boolean(errors.name?.message)}
            label={errors.name?.message || "Введіть назву товару"}
          />
          <TextField
            variant="standard"
            fullWidth
            className={styles.create__field}
            {...register(`description`)}
            error={Boolean(errors.description?.message)}
            label={errors.description?.message || "Введіть опис товару"}
          />
          <TextField
            variant="standard"
            type="number"
            fullWidth
            className={styles.create__field}
            {...register(`price`)}
            error={Boolean(errors.price?.message)}
            label={errors.price?.message || "Введіть ціну товару"}
          />
          <TextField
            variant="standard"
            type="number"
            fullWidth
            className={styles.create__field}
            {...register(`count`)}
            error={Boolean(errors.count?.message)}
            label={errors.count?.message || "Введіть кількість товару"}
          />
          <FormControl variant="standard" className={styles.create__field}>
            <InputLabel>Виберіть статус</InputLabel>
            <Controller
              name="orderStatus"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  error={Boolean(errors.orderStatus?.message)}
                  label={errors.orderStatus?.message || "Виберіть статус"}
                >
                  <MenuItem value={"IN_STOCK"}>Є в наявності</MenuItem>
                  <MenuItem value={"TO_ORDER"}>Під заказ</MenuItem>
                  <MenuItem value={"OUT_OF_STOCK"}>Немає в наявності</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <h3>Додати фото</h3>
          <Photo photos={photos} setPhotos={setPhotos} />
          <h3>Поля категорії</h3>
          <FormControl variant="standard" className={styles.create__field}>
            <InputLabel>Виберіть категорію</InputLabel>
            <Select value={categoryId} onChange={handleChangeCategory} label="Виберіть категорію">
              {categories &&
                categories.length > 0 &&
                categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <p>
            Немає необхійдої категорії?{" "}
            <span onClick={() => setActiveModalCreateCategory(true)}>Створити</span>.
          </p>

          <FormControl variant="standard" className={styles.create__field}>
            <InputLabel error={Boolean(errors.subcategoryId?.message)}>
              {errors.subcategoryId?.message || "Виберіть підкатегорію"}
            </InputLabel>
            <Controller
              name="subcategoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  error={Boolean(errors.subcategoryId?.message)}
                  label={errors.subcategoryId?.message || "Виберіть підкатегорію"}
                >
                  {subcategories &&
                    subcategories.length > 0 &&
                    subcategories.map(subcategories => (
                      <MenuItem key={subcategories.id} value={subcategories.id}>
                        {subcategories.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>

          <p>
            Немає необхійдої підкатегорії?{" "}
            <span onClick={() => setActiveModalSubCreateCategory(true)}>Створити</span>.
          </p>
          <h3>Додаткові поля</h3>
          {propertyFields.map((field, index) => (
            <div className={styles.create__field_button} key={field.id}>
              <TextField
                variant="standard"
                fullWidth
                className={styles.create__field}
                {...register(`properties.${index}.name`)}
                error={Boolean(errors?.properties && errors?.properties[index]?.name?.message)}
                label={
                  (errors?.properties && errors?.properties[index]?.name?.message) ||
                  "Введіть властивість"
                }
              />
              <TextField
                variant="standard"
                fullWidth
                className={styles.create__field}
                {...register(`properties.${index}.value`)}
                error={Boolean(errors?.properties && errors?.properties[index]?.value?.message)}
                label={
                  (errors?.properties && errors?.properties[index]?.value?.message) ||
                  "Введіть значення"
                }
              />
              <button
                type="button"
                className={styles.create__minus}
                onClick={() => propertyRemove(index)}
              >
                <RemoveIcon sx={{ fontSize: 36 }} />
              </button>
            </div>
          ))}
          <button
            type="button"
            className={styles.create__add}
            onClick={() =>
              propertyAppend({
                name: "",
                value: "",
              })
            }
          >
            <AddIcon sx={{ fontSize: 36 }} />
          </button>
          <button type="submit" className={styles.create__submit} disabled={isPending}>
            Створити
          </button>
        </form>
      </div>
      <CreateCategory
        activeModal={activeModalCreateCategory}
        setActiveModal={setActiveModalCreateCategory}
      />
      <CreateSubCategory
        categoryId={categoryId}
        activeModal={activeModalSubCreateCategory}
        setActiveModal={setActiveModalSubCreateCategory}
      />
    </section>
  );
}
