import { ReactNode } from "react";
import styles from "./table.module.scss";

interface Props {
  children: ReactNode;
}
export default function Table({ children }: Props) {
  return <table className={styles.container}>{children}</table>;
}
