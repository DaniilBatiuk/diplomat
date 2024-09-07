import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { signIn, useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { MyButton } from "@/components/ui/MyButton/MyButton";

import { LoginType, formLoginSchema } from "@/utils/lib/validators/login-and-regirter-validartor";

import styles from "../../RegisterOrLogin.module.scss";

import { UserService } from "@/utils/services/user";

type LoginProp = {
  closeAllAuthMenu: () => void;
  setRegisterActive: Dispatch<SetStateAction<boolean>>;
  setLoginActive: Dispatch<SetStateAction<boolean>>;
  registerActive: boolean;
  loginActive: boolean;
};

export const Login: React.FC<LoginProp> = ({
  closeAllAuthMenu,
  setRegisterActive,
  setLoginActive,
  registerActive,
  loginActive,
}: LoginProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    mode: "onBlur",
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { data: user } = useSession();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  useEffect(() => {
    if (user) {
      mutate(user.user.id);
    }
  }, [user]);

  const onSubmit: SubmitHandler<LoginType> = async data => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success("Ви успішно увійшли до акаунту.");

      closeAllAuthMenu();
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast.error("Невірний Email або пароль.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(styles.login__content, { [styles.active]: loginActive })}
    >
      <div className={styles.login__title}>Ласкаво просимо!</div>
      <div className={styles.login__subtitle}>
        Введіть свої облікові дані, щоб продовжити користуватися нашими послугами.
      </div>
      <div className={styles.login__fields}>
        <TextField
          variant="standard"
          fullWidth
          className={styles.login__field}
          type="email"
          {...register("email")}
          error={Boolean(errors.email?.message)}
          label={errors.email?.message || "Введіть свою пошту"}
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
      </div>
      <MyButton
        className={clsx(styles.login__button, {
          [styles.login__button_disable]: isSubmitting,
        })}
        type="submit"
        disabled={isSubmitting}
      >
        Увійти
      </MyButton>
      <div className={styles.login__no_profile}>
        Немає профілю?{" "}
        <span
          onClick={() => {
            setLoginActive(!loginActive);
            setRegisterActive(!registerActive);
          }}
        >
          Зареєструйтеся
        </span>
      </div>
    </form>
  );
};
