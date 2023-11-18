import { ReactNode } from "react";
import { Skeleton } from "../skeleton";
import styles from "./tableLoader.module.scss";

interface Props {
  isLoading: boolean;
  children: ReactNode;
  colSpan: number;
}
export default function TableLoader({ isLoading, children, colSpan }: Props) {
  return (
    <>
      {isLoading ? (
        <tr>
          <td colSpan={colSpan}>
            <div className={styles.container}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </td>
        </tr>
      ) : (
        children
      )}
    </>
  );
}
