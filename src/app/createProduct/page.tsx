"use client";

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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { CreateCategory } from "./CreateCategory/CreateCategory";
import { CreateSubCategory } from "./CreateSubCategory/CreateSubCategory";
import { Photo } from "./Photo/Photo";
import styles from "./createProduct.module.scss";
import { CategoriesService } from "@/utils/services/categories";

export default function CreateProduct() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [photos, setPhotos] = useState<{ id: string; file: File }[]>([]);
  const [activeModalCreateCategory, setActiveModalCreateCategory] = useState(false);
  const [activeModalSubCreateCategory, setActiveModalSubCreateCategory] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesService.getAllCategories,
  });

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const handleChangeSubCategory = (event: SelectChangeEvent) => {
    setSubCategory(event.target.value as string);
  };

  const { control, register, handleSubmit } = useForm<CreateProduct>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      count: 1,
      orderStatus: OrderStatus.IN_STOCK,
      imageUrls: [],
      properties: [],
    },
    mode: "onBlur",
  });

  const {
    fields: propertyFields,
    append: propertyAppend,
    remove: propertyRemove,
  } = useFieldArray({ control, name: `properties` });

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className={styles.create}>
      <div className={styles.create__container}>
        <h1>СТВОРИТИ ПРОДУКТ</h1>

        <form className={styles.create__main} onSubmit={handleSubmit(onSubmit)}>
          <h3>Основні поля</h3>
          <TextField
            label="Введіть назву товару"
            variant="standard"
            fullWidth
            className={styles.create__field}
            {...register(`name`)}
          />
          <TextField
            label="Введіть опис товару"
            variant="standard"
            fullWidth
            className={styles.create__field}
            {...register(`description`)}
          />
          <TextField
            label="Введіть ціну товару"
            variant="standard"
            type="number"
            fullWidth
            className={styles.create__field}
            {...register(`price`)}
          />
          <TextField
            label="Введіть кількість товару"
            variant="standard"
            type="number"
            fullWidth
            className={styles.create__field}
            {...register(`count`)}
          />
          <FormControl variant="standard" className={styles.create__field}>
            <InputLabel>Виберіть статус</InputLabel>
            <Controller
              name="orderStatus"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Виберіть статус">
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
            <Select value={category} onChange={handleChangeCategory} label="Виберіть категорію">
              {categories?.map(category => (
                <MenuItem key={category.id} value={category.name}>
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
            <InputLabel>Виберіть підкатегорію</InputLabel>
            <Select
              value={subCategory}
              onChange={handleChangeSubCategory}
              label="Виберіть підкатегорію"
            >
              <MenuItem value={"Новинки"}>Новинки</MenuItem>
              <MenuItem value={"Дешевше"}>Дешевше</MenuItem>
              <MenuItem value={"Дорожче"}>Дорожче</MenuItem>
            </Select>
          </FormControl>
          <p>
            Немає необхійдої підкатегорії?{" "}
            <span onClick={() => setActiveModalSubCreateCategory(true)}>Створити</span>.
          </p>
          <h3>Додаткові поля</h3>
          {propertyFields.map((field, index) => (
            <div className={styles.create__field_button} key={field.id}>
              <TextField
                label="Введіть властивість"
                variant="standard"
                fullWidth
                className={styles.create__field}
                {...register(`properties.${index}.name`)}
              />
              <TextField
                label="Введіть значення"
                variant="standard"
                fullWidth
                className={styles.create__field}
                {...register(`properties.${index}.value`)}
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
          <button type="submit" className={styles.create__submit}>
            Створити
          </button>
        </form>
      </div>
      <CreateCategory
        activeModal={activeModalCreateCategory}
        setActiveModal={setActiveModalCreateCategory}
      />
      <CreateSubCategory
        activeModal={activeModalSubCreateCategory}
        setActiveModal={setActiveModalSubCreateCategory}
      />
    </div>
  );
}
