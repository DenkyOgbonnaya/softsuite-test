import { ChangeEvent, ComponentProps, useState } from "react";
import styles from "./switch.module.scss";

export interface SwitchProps extends ComponentProps<"input"> {
  label?: string;
  name: string;
  value: string;
}
export default function Switch({
  label,
  name,
  onChange,
  value,
  ...rest
}: SwitchProps) {
  const [state, setState] = useState<boolean>(() => {
    return value === "active" ? true : false;
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setState(checked);
    if (onChange) onChange(e);
  };
  return (
    <>
      <label className={styles.switch}>
        <span className={styles.label}>{state ? "active" : "inactive"}</span>
        <input
          name={name}
          checked={state}
          onChange={handleChange}
          type="checkbox"
          {...rest}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </>
  );
}
