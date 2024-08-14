"use client";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const router = useRouter();

  const login = false;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/">
          <p className={styles.header__logo}>DIPLOMAT</p>
        </Link>
        <div className={styles.header__list_categories}>
          <div className={styles.header__category}>Vases</div>
          <div className={styles.header__category}>Dishes</div>
          <div className={styles.header__category}>Leather</div>
          <div className={styles.header__category}>Paintings</div>
        </div>

        <div className={styles.header__list}>
          {login ? (
            <div className={styles.header__icon}>
              <Badge color="error" badgeContent={1}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} />
              </Badge>
            </div>
          ) : (
            <>
              <button className={styles.header__signin}>SIGN IN</button>
              <button className={styles.header__signup}>SIGN UP</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
