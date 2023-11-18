import { Caution, EmptyIcon } from "@/assets";
import styles from "./empty.module.scss";

interface Props {
    message: string;
}
export default function Empty({message}:Props) {
  return (
    <>
      <div className={styles.container}>
        <EmptyIcon />
        <div className={styles.hstack}>
          <Caution />
          <span className={styles.label}>{message}</span>
        </div>
      </div>
    </>
  );
}
