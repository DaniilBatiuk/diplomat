"use client";

import { TextField } from "@mui/material";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

import { MyButton } from "@/components/ui/MyButton/MyButton";

import { ICONS } from "@/utils/config/icons";

import styles from "./RegisterOrLogin.module.scss";

type RegisterOrLoginProp = {
  registerActive: boolean;
  loginActive: boolean;
  setRegisterActive: Dispatch<SetStateAction<boolean>>;
  setLoginActive: Dispatch<SetStateAction<boolean>>;
};

export const RegisterOrLogin: React.FC<RegisterOrLoginProp> = ({
  registerActive,
  setRegisterActive,
  setLoginActive,
  loginActive,
}: RegisterOrLoginProp) => {
  const closeAllAuthMenu = () => {
    setLoginActive(false);
    setRegisterActive(false);
  };

  return (
    <>
      <section className={clsx(styles.login, { [styles.active]: registerActive || loginActive })}>
        <div className={styles.login__header}>
          <h1>{registerActive ? "Реєстрація" : "Вхід"}</h1>
          {ICONS.close({ onClick: () => closeAllAuthMenu() })}
        </div>
        <div className={styles.login__container}>
          <div className={clsx(styles.login__content, { [styles.active]: registerActive })}>
            <div className={styles.login__title}>Ласкаво просимо!</div>
            <div className={styles.login__subtitle}>
              Заповніть всі поля нижче, щоб створити свій профіль.
            </div>
            <div className={styles.login__fields}>
              <TextField
                label="Введіть ім'я та прізвище"
                variant="standard"
                fullWidth
                className={styles.login__field}
              />
              <TextField
                label="Введіть свою почту"
                variant="standard"
                fullWidth
                className={styles.login__field}
              />
              <TextField
                label="Введіть свій пароль"
                variant="standard"
                fullWidth
                type="password"
                className={styles.login__field}
              />
              <TextField
                label="Підтвердіть свій пароль"
                variant="standard"
                fullWidth
                type="password"
                className={styles.login__field}
              />
            </div>
            <MyButton className={styles.login__button}>Зареєструватись</MyButton>
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
          </div>

          <div className={clsx(styles.login__content, { [styles.active]: loginActive })}>
            <div className={styles.login__title}>Ласкаво просимо!</div>
            <div className={styles.login__subtitle}>
              Введіть свої облікові дані, щоб продовжити користуватися нашими послугами.
            </div>
            <div className={styles.login__fields}>
              <TextField
                label="Введіть свою почту"
                variant="standard"
                fullWidth
                className={styles.login__field}
              />
              <TextField
                label="Введіть свій пароль"
                variant="standard"
                fullWidth
                type="password"
                className={styles.login__field}
              />
            </div>
            <MyButton className={styles.login__button}>Увійти</MyButton>
            <div className={styles.login__no_profile}>
              Немає профілю?{" "}
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
                Зареєструйтеся
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
