import { ChevronRight } from "@/assets";
import { useMemo } from "react";
import styles from "./breadcrumb.module.scss";

interface Props {
  path: string[];
}
export default function BreadCrumb({ path }: Props) {
  const isLastpath = useMemo(() => {
    return (pathIndex: number, totalPaths: number) =>  {
      return pathIndex === totalPaths - 1;
    };
  }, []);
  return (
    <div className={styles.container}>
      {path.map((item, index) => (
        <div
          key={item}
          className={`${styles.path} ${
            isLastpath(index, path.length) ? styles.activePath : ""
          }`}
        >
          <span>{item}</span>
          {!isLastpath(index, path.length) && <ChevronRight />}
        </div>
      ))}
    </div>
  );
}
