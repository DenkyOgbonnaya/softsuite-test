import React, { FC } from "react";
import styles from "./overlay.module.scss";

interface Props {
  visible: boolean;
  children: React.ReactNode;
}
const OVerlay: FC<Props> = ({ visible, children }) => {
  return (
    <div
      className={`${styles.container} ${
        visible ? styles.visible : styles.invisible
      }`}
    >
      {children}
    </div>
  );
};

export default OVerlay;
