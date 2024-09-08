import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

import styles from "../../CategoriesAndSearch.module.scss";

type SubCategoriesListProp = {
  subCategorySelected: SubcategorySearch | null;
  setCategorySelected: Dispatch<SetStateAction<Category | null>>;
  setSubCategorySelected: Dispatch<SetStateAction<SubcategorySearch | null>>;
  categorySelected: Category | null;
};

export const SubCategoriesList: React.FC<SubCategoriesListProp> = ({
  setCategorySelected,
  setSubCategorySelected,
  subCategorySelected,
  categorySelected,
}: SubCategoriesListProp) => {
  const pathname = usePathname();
  return (
    <>
      <Link
        scroll={false}
        href={`/category/Всі`}
        className={clsx(
          styles.categories__subcategories_item,
          styles.categories__subcategories_item_close,
        )}
        onClick={() => setCategorySelected(null)}
      >
        <ArrowBackIcon sx={{ fontSize: 19 }} />
      </Link>
      <Link
        href={`${pathname}?subcategory=Всі`}
        className={clsx(styles.categories__subcategories_item, {
          [styles.active]: subCategorySelected === null,
        })}
        onClick={() => setSubCategorySelected(null)}
      >
        Всі
      </Link>

      {categorySelected &&
        categorySelected.subcategories.map(subcategory => (
          <Link
            href={`${pathname}?subcategory=${subcategory.name}`}
            key={subcategory.id}
            className={clsx(styles.categories__subcategories_item, {
              [styles.active]: subCategorySelected?.id === subcategory.id,
            })}
            onClick={() => setSubCategorySelected(subcategory)}
          >
            {subcategory.name}
          </Link>
        ))}
    </>
  );
};
