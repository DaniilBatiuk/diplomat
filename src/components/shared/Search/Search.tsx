import clsx from "clsx";

import styles from "./Search.module.scss";

type SearchProp = {
  className?: string | undefined;
  classNameInput?: string | undefined;
};

export const Search: React.FC<SearchProp> = ({ className, classNameInput }: SearchProp) => {
  return (
    <div className={clsx(styles.search__search, className)}>
      <input
        type="text"
        className={clsx(styles.search__input, classNameInput)}
        placeholder="Я шукаю..."
      />
      <button>Знайти</button>
    </div>
  );
};
