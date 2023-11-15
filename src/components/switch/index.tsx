import { ComponentProps } from "react";
import styles from "./switch.module.scss";

export interface SwitchProps extends ComponentProps<"input"> {
  label?: string;
  name: string;
}
export default function Switch({ label, name, ...rest }: SwitchProps) {
  return (
    <>
      <label className={styles.switch}>
        {label && <span className={styles.label}>{label}</span>}
        <input name={name} type="checkbox" {...rest} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </>
  );
}
