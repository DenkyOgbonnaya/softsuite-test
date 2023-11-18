import { ReactNode } from "react";
import styles from "./tableContainer.module.scss";

interface Props {
  children: ReactNode;
}
export default function TableContainer({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
