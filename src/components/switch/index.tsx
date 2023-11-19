import { ComponentProps } from "react";
import styles from "./switch.module.scss";

export interface SwitchProps extends ComponentProps<"input"> {
  label?: string;
  name: string;
  value: string
}
export default function Switch({ label, name, value, ...rest }: SwitchProps) {

  console.log(value, name, "hello")
  return (
    <>
      <label className={styles.switch}>
         <span className={styles.label}>{value === "true" ? "active" : "inactive"}</span>
        <input name={name} value={value} type="checkbox" {...rest} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </>
  );
}
