"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import styles from "./Counter.module.scss";

type CounterProp = {
  maxCount?: number;
  currentValue?: number;
  onChange?: Dispatch<SetStateAction<number>>;
};

export const Counter: React.FC<CounterProp> = ({
  maxCount,
  onChange,
  currentValue,
}: CounterProp) => {
  const [count, setCount] = useState(currentValue ?? 1);

  useEffect(() => {
    if (onChange) {
      onChange(count);
    }
  }, [count]);

  return (
    <div className={styles.counter}>
      <div
        className={clsx(styles.counter__minus, {
          [styles.counter__disable]: count === 1,
        })}
      >
        <RemoveIcon onClick={() => setCount(prev => (prev > 1 ? prev - 1 : prev))} />
      </div>

      <input
        className={styles.counter__field}
        type="number"
        value={count}
        onChange={e => {
          if (+e.target.value < (maxCount ? maxCount : 1000)) {
            setCount(+e.target.value);
          }
          if (+e.target.value === 0) {
            setCount(1);
          }
        }}
      />
      <div
        className={clsx(styles.counter__plus, {
          [styles.counter__disable]: count === (maxCount ? maxCount : 999),
        })}
      >
        <AddIcon
          onClick={() => setCount(prev => (prev < (maxCount ? maxCount : 999) ? prev + 1 : prev))}
        />
      </div>
    </div>
  );
};
