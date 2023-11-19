import { ComponentProps } from "react";
import styles from "./radioButton.module.scss";

export interface RadioButtonProps extends ComponentProps<"input"> {
  label?: string;
  name: string;
  value: string
}
export default function RadioButton({
  name,
  value,
  label,

  ...rest
}: RadioButtonProps) {
  return (
    <>
      <label htmlFor={value} className={styles.container}>
        {label && label}
        <input name={name} id={value} value={value} type="radio" {...rest} />
        <span className={styles.checkmark}></span>
      </label>
    </>
  );
}
