import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { createCategory } from "@/utils/lib/actions/category";

import { CategoryScheme, CategoryType } from "@/utils/lib/validators/category-validator";

import styles from "../createProduct.module.scss";

import { Modal } from "@/components";

type CreateCategory = {
  activeModal: boolean;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
};

export const CreateCategory: React.FC<CreateCategory> = ({
  activeModal,
  setActiveModal,
}: CreateCategory) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryType>({
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
    resolver: zodResolver(CategoryScheme),
  });

  const onSubmit: SubmitHandler<CategoryType> = async data => {
    mutate(data);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Категорія була успішно створена.");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
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
        <h2 className={styles.create_category_title}>Створити категорію</h2>
        <div className={styles.create_category_body}>
          <TextField
            variant="standard"
            fullWidth
            className={styles.create__field}
            {...register(`name`)}
            error={Boolean(errors.name?.message)}
            label={errors.name?.message || "Введіть назву категорії"}
          />
        </div>
        <button type="submit" className={styles.create__submit} disabled={isPending}>
          Створити
        </button>
      </form>
    </Modal>
  );
};
