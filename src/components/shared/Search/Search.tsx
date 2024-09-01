"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import styles from "./Search.module.scss";

type SearchProp = {
  className?: string | undefined;
  classNameInput?: string | undefined;
};

export const Search: React.FC<SearchProp> = ({ className, classNameInput }: SearchProp) => {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (inputRef.current && !pathname.includes("/category")) {
      inputRef.current.value = "";
    }
  }, [pathname]);

  useEffect(() => {
    const search_text = searchParams.get("search_text");
    if (inputRef.current && search_text) {
      inputRef.current.value = search_text;
    } else if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [searchParams]);

  return (
    <form
      className={clsx(styles.search__search, className)}
      onSubmit={e => {
        e.preventDefault();
        router.push(`/category/Всі?search_text=${inputRef.current ? inputRef.current.value : ""}`);
      }}
    >
      <input
        type="text"
        ref={inputRef}
        className={clsx(styles.search__input, classNameInput)}
        placeholder="Я шукаю..."
      />
      <button type="submit">Знайти</button>
    </form>
  );
};
