"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import styles from "./Counter.module.scss";

type CounterProp = {
  maxCount?: number;
  onChange?: Dispatch<SetStateAction<number>>;
};

export const Counter: React.FC<CounterProp> = ({ maxCount, onChange }: CounterProp) => {
  const [state, setState] = useState(1);

  useEffect(() => {
    if (onChange) {
      onChange(state);
    }
  }, [state]);
  return (
    <div className={styles.counter}>
      <div className={styles.counter__minus}>
        <RemoveIcon onClick={() => setState(prev => (prev > 1 ? prev - 1 : prev))} />
      </div>

      <input
        className={styles.counter__field}
        type="number"
        value={state}
        onChange={e => {
          if (+e.target.value < (maxCount ? maxCount : 1000)) {
            setState(+e.target.value);
          }
          if (+e.target.value === 0) {
            setState(1);
          }
        }}
      />
      <div className={styles.counter__plus}>
        <AddIcon
          onClick={() => setState(prev => (prev < (maxCount ? maxCount : 999) ? prev + 1 : prev))}
        />
      </div>
    </div>
  );
};
