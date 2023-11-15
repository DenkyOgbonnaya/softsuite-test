import { ComponentProps, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./selectInput.module.scss";

const input = cva(styles.input, {
  variants: {
    intent: {
      primary: styles.input,
    },
    error: {
      true: styles.error,
      false: styles.input,
    },
  },

  defaultVariants: {
    intent: "primary",
    error: false,
  },
});

export interface InputProps
  extends ComponentProps<"select">,
    VariantProps<typeof input> {
  name: string;
  label?: string;
  children: ReactNode;
  errorMessage?: string;
}
export default function Input({
  name,
  label,
  errorMessage,
  className,
  intent,
  error,
  children,
  ...rest
}: InputProps) {
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {label && label}
        <select
          name={name}
          className={input({ intent, error, className })}
          {...rest}
        >
          {children}
        </select>

        {errorMessage && (
          <div className={styles.errorWrap}>
            <span className={styles.errorLabel}>{errorMessage}</span>
          </div>
        )}
      </label>
    </>
  );
}
