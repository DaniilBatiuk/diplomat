"use client";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Skeleton } from "@mui/material";
import { UserRole } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { MyButton } from "@/components/ui/MyButton/MyButton";

import { ICONS } from "@/utils/config/icons";
import { LINKS } from "@/utils/config/pages-url.config";

import { RegisterOrLogin } from "../RegisterOrLogin/RegisterOrLogin";
import { Search } from "../Search/Search";

import "./Header.scss";
import { CartService } from "@/utils/services/cart";

// type HeaderProp = {
//   userFromServer: UserAuth;
// };

export const Header: React.FC = () => {
  const { data } = useSession();

  // const [user, setUser] = useState<UserAuth>(userFromServer);
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const [loginActive, setLoginActive] = useState<boolean>(false);
  const [registerActive, setRegisterActive] = useState<boolean>(false);

  const router = useRouter();

  const menuOpen = () => {
    setMenuActive(prev => !prev);
    document.documentElement.classList.toggle("open-menu");
  };

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => CartService.getCart(),
  });

  useEffect(() => {
    loginActive || registerActive
      ? document.documentElement.classList.add("open-left")
      : document.documentElement.classList.remove("open-left");
  }, [loginActive, registerActive]);

  // useEffect(() => {
  //   if (!user) {
  //     setUser(data ? data.user : null);
  //   }
  // }, [data]);

  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link href={LINKS.HOME}>
            <p className="header__logo">
              <span>Д</span>иплома<span>Т</span>
            </p>
          </Link>
          <Search className="header__search" classNameInput="header__search_input" />

          <div className="header__list">
            {data && data.user.role === UserRole.ADMIN && (
              <Link href={LINKS.ADMIN} className="header__admin">
                Адмін
              </Link>
            )}
            {data === undefined ? (
              <>
                <Skeleton variant="rectangular" className="header__skeleton" width={57} />
                <Skeleton variant="rectangular" className="header__skeleton" />
              </>
            ) : data === null ? (
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

                <MyButton className="header__signup" onClick={() => setRegisterActive(true)}>
                  Зареєструватись
                </MyButton>
              </>
            ) : (
              <MyButton
                className="header__signup"
                onClick={() => {
                  Cookies.remove("cartToken");
                  Cookies.remove("savedToken");
                  signOut();
                }}
              >
                Вийти
              </MyButton>
            )}
            <Link href={LINKS.BASKET}>
              <Badge color="error" badgeContent={cart?.items.length ?? 0}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} />
              </Badge>
            </Link>
            <Link href={LINKS.SAVED}>
              <FavoriteBorderIcon sx={{ fontSize: 28 }} />
            </Link>
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
              {data && data.user.role === UserRole.ADMIN && (
                <MyButton
                  className="header__signup-menu"
                  onClick={() => {
                    router.push("/admin");
                    setMenuActive(false);
                  }}
                >
                  Адмін
                </MyButton>
              )}
              {data === null ? (
                <>
                  <MyButton className="header__signup-menu" onClick={() => setLoginActive(true)}>
                    Увійти
                  </MyButton>
                  <MyButton className="header__signup-menu" onClick={() => setRegisterActive(true)}>
                    Зареєструватись
                  </MyButton>
                </>
              ) : (
                <MyButton
                  className="header__signup-menu"
                  onClick={() => {
                    Cookies.remove("cartToken");
                    Cookies.remove("savedToken");
                    signOut();
                  }}
                >
                  Вийти
                </MyButton>
              )}
            </div>
          </div>
        </div>
      </header>
      <RegisterOrLogin
        registerActive={registerActive}
        setRegisterActive={setRegisterActive}
        setLoginActive={setLoginActive}
        loginActive={loginActive}
        menuOpen={menuOpen}
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
