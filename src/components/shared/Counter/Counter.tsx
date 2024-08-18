"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

import styles from "./Counter.module.scss";

export const Counter: React.FC = () => {
  const [state, setState] = useState(1);
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
          if (+e.target.value < 1000) {
            setState(+e.target.value);
          }
          if (+e.target.value === 0) {
            setState(1);
          }
        }}
      />
      <div className={styles.counter__plus}>
        <AddIcon onClick={() => setState(prev => (prev < 999 ? prev + 1 : prev))} />
      </div>
    </div>
  );
};
