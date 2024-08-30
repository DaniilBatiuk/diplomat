import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import styles from "../../CategoriesAndSearch.module.scss";

type CategoriesListProp = {
  categorySelected: Category | null;
  setCategorySelected: Dispatch<SetStateAction<Category | null>>;
  categoriesList: Category[];
};

export const CategoriesList: React.FC<CategoriesListProp> = ({
  categorySelected,
  setCategorySelected,
  categoriesList,
}: CategoriesListProp) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search_text");

  return (
    <>
      <Link
        href={`/category/Всі?search_text=${search ?? ""}`}
        className={clsx(styles.categories__subcategories_item, {
          [styles.active]: categorySelected === null,
        })}
        onClick={() => setCategorySelected(null)}
      >
        Всі
      </Link>
      {categoriesList.map(category => (
        <Link
          href={`/category/${category.name}?search_text=${search ?? ""}`}
          key={category.id}
          className={clsx(styles.categories__subcategories_item, {
            [styles.active]: categorySelected === category,
          })}
          onClick={() => setCategorySelected(category)}
        >
          {category.name}
        </Link>
      ))}
    </>
  );
};
