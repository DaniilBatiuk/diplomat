import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { createSubCategory } from "@/utils/lib/actions/subcategory";

import { SubCategoryScheme, SubCategoryType } from "@/utils/lib/validators/subCategory-validator";

import styles from "../createProduct.module.scss";

import { Modal } from "@/components";

type CreateSubCategory = {
  activeModal: boolean;
  categoryId: string;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
};

export const CreateSubCategory: React.FC<CreateSubCategory> = ({
  activeModal,
  setActiveModal,
  categoryId,
}: CreateSubCategory) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubCategoryType>({
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
    resolver: zodResolver(SubCategoryScheme),
  });

  const onSubmit: SubmitHandler<SubCategoryType> = async data => {
    if (categoryId === "") {
      toast.error("Категорія не вибрана.");
      return;
    }
    mutate({ ...data, categoryId });
  };

  const { isPending, mutate } = useMutation({
    mutationFn: createSubCategory,
    onSuccess: () => {
      toast.success("Підкатегорія була успішно створена.");
      queryClient.invalidateQueries({
        queryKey: ["subcategories"],
      });
      setActiveModal(false);
    },

    onError: error => {
      toast.error(error.message);
    },
  });

  return (
    <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="500px">
      <form className={styles.create_category_header} onSubmit={handleSubmit(onSubmit)}>
        <CloseIcon onClick={() => setActiveModal(false)} sx={{ fontSize: 36 }} />
        <h2 className={styles.create_category_title}>Створити підкатегорію</h2>
        <div className={styles.create_category_body}>
          <TextField
            variant="standard"
            fullWidth
            className={styles.create__field}
            {...register(`name`)}
            error={Boolean(errors.name?.message)}
            label={errors.name?.message || "Введіть назву підкатегорії"}
          />
        </div>
        <button type="submit" className={styles.create__submit} disabled={isPending}>
          Створити
        </button>
      </form>
    </Modal>
  );
};
