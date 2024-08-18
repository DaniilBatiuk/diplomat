import clsx from "clsx";
import React from "react";

import styles from "./MyButton.module.scss";

export interface ButtonConfirmProps extends React.ComponentProps<"button"> {}

export const MyButton: React.FC<ButtonConfirmProps> = ({
  children,
  className,
  ...props
}: ButtonConfirmProps) => {
  return (
    <button className={clsx(styles.my_button, className)} {...props}>
      {children}
    </button>
  );
};
