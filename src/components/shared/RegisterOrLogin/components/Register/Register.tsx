import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { MyButton } from "@/components/ui/MyButton/MyButton";

import { registerUser } from "@/utils/lib/actions/user";

import {
  RegisterType,
  formRegisterSchema,
} from "@/utils/lib/validators/login-and-regirter-validartor";

import styles from "../../RegisterOrLogin.module.scss";

type RegisterProp = {
  closeAllAuthMenu: () => void;
  setRegisterActive: Dispatch<SetStateAction<boolean>>;
  setLoginActive: Dispatch<SetStateAction<boolean>>;
  registerActive: boolean;
  loginActive: boolean;
};

export const Register: React.FC<RegisterProp> = ({
  closeAllAuthMenu,
  setRegisterActive,
  setLoginActive,
  registerActive,
  loginActive,
}: RegisterProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({
    mode: "onBlur",
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterType> = async data => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      const userForLogin = {
        email: data.email,
        password: data.password,
      };

      const resp = await signIn("credentials", {
        ...userForLogin,
        redirect: false,
      });

      toast.success("Ви успішно зарееструвалися.");

      closeAllAuthMenu();
    } catch (error) {
      console.error("Error [REGISTER]", error);
      toast.error("Користувач з таким Email вже існує.");
    }
  };

  return (
    <form
      className={clsx(styles.login__content, { [styles.active]: registerActive })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.login__title}>Ласкаво просимо!</div>
      <div className={styles.login__subtitle}>
        Заповніть всі поля нижче, щоб створити свій профіль.
      </div>
      <div className={styles.login__fields}>
        <TextField
          variant="standard"
          fullWidth
          className={styles.login__field}
          {...register("fullName")}
          error={Boolean(errors.fullName?.message)}
          label={errors.fullName?.message || "Введіть ім'я та прізвище"}
        />
        <TextField
          variant="standard"
          fullWidth
          type="email"
          className={styles.login__field}
          {...register("email")}
          error={Boolean(errors.email?.message)}
          label={errors.email?.message || "Введіть свою почту"}
        />
        <TextField
          variant="standard"
          fullWidth
          type="password"
          className={styles.login__field}
          {...register("password")}
          error={Boolean(errors.password?.message)}
          label={errors.password?.message || "Введіть свій пароль"}
        />
        <TextField
          variant="standard"
          fullWidth
          type="password"
          className={styles.login__field}
          {...register("confirmPassword")}
          error={Boolean(errors.confirmPassword?.message)}
          label={errors.confirmPassword?.message || "Підтвердіть свій пароль"}
        />
      </div>
      <MyButton
        className={clsx(styles.login__button, {
          [styles.login__button_disable]: isSubmitting,
        })}
        type="submit"
        disabled={isSubmitting}
      >
        Зареєструватись
      </MyButton>
      <div className={styles.login__no_profile}>
        Вже є профіль?{" "}
        <span
          onClick={() => {
            if (loginActive) {
              setLoginActive(false);
              setRegisterActive(true);
            } else {
              setLoginActive(true);
              setRegisterActive(false);
            }
          }}
        >
          Увійдіть
        </span>
      </div>
    </form>
  );
};
