import { TextField } from "@mui/material";
import { MuiTelInput, MuiTelInputInfo } from "mui-tel-input";
import { useState } from "react";

import styles from "../../Basket.module.scss";

export const SecondStep: React.FC = () => {
  const [value, setValue] = useState("");

  const handleChange = (newValue: string, info: MuiTelInputInfo) => {
    setValue(newValue);
  };

  return (
    <div className={styles.second}>
      <h2>Вкажіть персональні дані</h2>
      <div className={styles.second__fields}>
        <TextField
          variant="standard"
          fullWidth
          className={styles.second__field}
          // {...register(`name`)}
          // error={Boolean(errors.name?.message)}
          // label={errors.name?.message || "Введіть назву товару"}
          label="Ім'я та прізвище"
        />
        <TextField
          variant="standard"
          type="email"
          fullWidth
          className={styles.second__field}
          // {...register(`name`)}
          // error={Boolean(errors.name?.message)}
          // label={errors.name?.message || "Введіть назву товару"}
          label="Електронна пошта"
        />
        {/* <Controller
          name="phoneNumber"
          // control={control}
          rules={{ validate: value => matchIsValidTel(value) }}
          render={({ field: { ref: fieldRef, value, ...fieldProps }, fieldState }) => ( */}
        <MuiTelInput
          className={styles.second__field}
          variant="standard"
          fullWidth
          value={value}
          onChange={handleChange}
          //   {...fieldProps}
          //   value={value ?? ""}
          //   inputRef={fieldRef}
          label="Контактний номер телефону"
          //   helperText={fieldState.invalid ? "Incorrect phone number" : ""}
          //   error={fieldState.invalid}
          defaultCountry="UA"
        />
        {/* )}
        /> */}
      </div>
    </div>
  );
};
