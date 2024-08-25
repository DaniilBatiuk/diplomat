import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import styles from "../createProduct.module.scss";

import { Modal } from "@/components";

type CreateSubCategory = {
  activeModal: boolean;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
};

export const CreateSubCategory: React.FC<CreateSubCategory> = ({
  activeModal,
  setActiveModal,
}: CreateSubCategory) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
  });

  return (
    <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="500px">
      <div className={styles.create_category_header}>
        <CloseIcon onClick={() => setActiveModal(false)} sx={{ fontSize: 36 }} />
        <h2 className={styles.create_category_title}>Створити підкатегорію</h2>
        <form className={styles.create_category_body}>
          <TextField
            label="Введіть назву підкатегорії"
            variant="standard"
            fullWidth
            className={styles.create__field}
            {...register(`name`)}
          />
        </form>
      </div>

      <button type="submit" className={styles.create__submit}>
        Створити
      </button>
    </Modal>
  );
};
