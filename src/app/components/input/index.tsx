import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./inpul.module.scss";

const input = cva(styles.input, {
  variants: {
    intent: {
      primary: styles.input,
    },
    error: {
      true: styles.error,
      false: styles.input
    },
  },

  defaultVariants: {
    intent: "primary",
    error: false,
  },
});

export interface InputProps
  extends ComponentProps<"input">,
    VariantProps<typeof input> {
  name: string;
  label?: string;
  errorMessage?: string;
}
export default function Input({
  name,
  label,
  errorMessage,
  className,
  intent,
  error,
  ...rest
}: InputProps) {
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {label && label}
        <input name={name} className={input({ intent, error, className })} {...rest} />

        {errorMessage && (
          <div className={styles.errorWrap}>
            <span className={styles.errorLabel}>{errorMessage}</span>
          </div>
        )}
      </label>
    </>
  );
}
