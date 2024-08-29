import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

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
  return (
    <>
      <div
        className={clsx(
          styles.categories__subcategories_item,
          styles.categories__subcategories_item_close,
        )}
        onClick={() => setCategorySelected(null)}
      >
        <ArrowBackIcon sx={{ fontSize: 19 }} />
      </div>
      <div
        className={clsx(styles.categories__subcategories_item, {
          [styles.active]: subCategorySelected === null,
        })}
        onClick={() => setSubCategorySelected(null)}
      >
        Всі
      </div>

      {categorySelected &&
        categorySelected.subcategories.map(subcategory => (
          <div
            key={subcategory.id}
            className={clsx(styles.categories__subcategories_item, {
              [styles.active]: subCategorySelected === subcategory,
            })}
            onClick={() => setSubCategorySelected(subcategory)}
          >
            {subcategory.name}
          </div>
        ))}
    </>
  );
};
