"use client";

import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

import { ICONS } from "@/utils/config/icons";

import styles from "./RegisterOrLogin.module.scss";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

type RegisterOrLoginProp = {
  registerActive: boolean;
  loginActive: boolean;
  setRegisterActive: Dispatch<SetStateAction<boolean>>;
  setLoginActive: Dispatch<SetStateAction<boolean>>;
  menuOpen: () => void;
};

export const RegisterOrLogin: React.FC<RegisterOrLoginProp> = ({
  registerActive,
  setRegisterActive,
  setLoginActive,
  loginActive,
  menuOpen,
}: RegisterOrLoginProp) => {
  const closeAllAuthMenu = () => {
    setLoginActive(false);
    setRegisterActive(false);
    if (document.documentElement.classList.contains("open-menu")) {
      menuOpen();
    }
  };

  return (
    <>
      <section className={clsx(styles.login, { [styles.active]: registerActive || loginActive })}>
        <div className={styles.login__header}>
          <h1>{registerActive ? "Реєстрація" : "Вхід"}</h1>
          {ICONS.close({ onClick: () => closeAllAuthMenu() })}
        </div>
        <div className={styles.login__container}>
          <Register
            closeAllAuthMenu={closeAllAuthMenu}
            loginActive={loginActive}
            setRegisterActive={setRegisterActive}
            setLoginActive={setLoginActive}
            registerActive={registerActive}
          />
          <Login
            closeAllAuthMenu={closeAllAuthMenu}
            loginActive={loginActive}
            setRegisterActive={setRegisterActive}
            setLoginActive={setLoginActive}
            registerActive={registerActive}
          />
        </div>
      </section>
    </>
  );
};
