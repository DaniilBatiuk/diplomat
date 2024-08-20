import styles from "./Search.module.scss";

export const Search: React.FC = () => {
  return (
    <div className={styles.search__search}>
      <input type="text" className={styles.search__input} placeholder="Я шукаю..." />
      <button>Знайти</button>
    </div>
  );
};
