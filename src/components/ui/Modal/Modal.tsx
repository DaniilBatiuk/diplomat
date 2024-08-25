import clsx from "clsx";
import React from "react";

import styles from "./Modal.module.scss";

export interface ModalProps {
  active: boolean;
  children: React.ReactNode;
  maxDivWidth: string;
  setActive: (value: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
  active,
  children,
  maxDivWidth,
  setActive,
}: ModalProps) => {
  return (
    <section
      className={clsx(styles.modal, { [styles.active]: active })}
      onClick={() => setActive(false)}
    >
      <div
        className={clsx(styles.modal__content, { [styles.active]: active })}
        style={{ maxWidth: maxDivWidth }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </section>
  );
};
