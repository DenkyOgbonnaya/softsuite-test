import { ChangeEvent, ComponentProps, ReactNode } from "react";
import styles from "./radioGroup.module.scss";

export interface InputProps extends ComponentProps<"input"> {
  children: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errorMessage?: string;
  error?: boolean
}
export default function Input({
  children,
  onChange,
  label,
  errorMessage,
  error
}: InputProps) {
  return (
    <>
      <div className={styles.label}>
        {label && label}
        <div onChange={onChange} className={`${styles.input} ${error ? styles.error : ""}`}>
          {children}
        </div>

        {errorMessage && (
          <div className={styles.errorWrap}>
            <span className={styles.errorLabel}>{errorMessage}</span>
          </div>
        )}
      </div>
    </>
  );
}
