"use client";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ICONS } from "@/utils/config/icons";

import { RegisterOrLogin } from "../RegisterOrLogin/RegisterOrLogin";

import "./Header.scss";

export const Header: React.FC = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  const [loginActive, setLoginActive] = useState<boolean>(false);
  const [registerActive, setRegisterActive] = useState<boolean>(false);

  const menuOpen = () => {
    setMenuActive(prev => !prev);
    document.documentElement.classList.toggle("open-menu");
  };

  useEffect(() => {
    loginActive || registerActive
      ? document.documentElement.classList.add("open-left")
      : document.documentElement.classList.remove("open-left");
  }, [loginActive, registerActive]);

  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link href="/">
            <p className="header__logo">DIPLOMAT</p>
          </Link>
          <nav className="header__list_categories">
            <div className="header__category">Вази</div>
            <div className="header__category">Посуд</div>
            <div className="header__category">Кожа</div>
            <div className="header__category">Картини</div>
          </nav>

          <div className="header__list">
            {isSignIn ? (
              <div className="header__icon">
                <Badge color="error" badgeContent={1}>
                  <ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} />
                </Badge>
              </div>
            ) : (
              <>
                <button
                  className="header__signin"
                  onClick={() => {
                    setRegisterActive(false);
                    setLoginActive(true);
                  }}
                >
                  Увійти
                </button>
                <button className="header__signup" onClick={() => setRegisterActive(true)}>
                  Зареєструватись
                </button>
              </>
            )}
          </div>
          <button className="icon-menu" type="button" onClick={menuOpen}>
            {menuActive ? ICONS.close({ className: "svg-open" }) : ICONS.menuOpen()}
          </button>
          <div className={menuActive ? "menu-open active" : "menu-open"}>
            <nav className="menu-open-list">
              <div className="list__item">Вази</div>
              <div className="list__item">Посуд</div>
              <div className="list__item">Кожа</div>
              <div className="list__item">Картини</div>
            </nav>
            <div className="header__menu-buttons">
              <button className="header__signin-menu" onClick={() => setLoginActive(true)}>
                Увійти
              </button>
              <button className="header__signup-menu" onClick={() => setRegisterActive(true)}>
                Зареєструватись
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* <Login
        loginActive={loginActive}
        setLoginActive={setLoginActive}
        setRegisterActive={setRegisterActive}
      /> */}
      <RegisterOrLogin
        registerActive={registerActive}
        setRegisterActive={setRegisterActive}
        setLoginActive={setLoginActive}
        loginActive={loginActive}
      />
      <div
        className={clsx("dark", { ["active"]: loginActive || registerActive })}
        onClick={() => {
          setLoginActive(false);
          setRegisterActive(false);
        }}
      ></div>
    </>
  );
};
