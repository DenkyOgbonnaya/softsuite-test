import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./textArea.module.scss";

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

export interface TextAreaProps
  extends ComponentProps<"textarea">,
    VariantProps<typeof input> {
  name: string;
  label?: string;
  errorMessage?: string;
}
export default function TextArea({
  name,
  label,
  errorMessage,
  className,
  intent,
  error,
  ...rest
}: TextAreaProps) {
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {label && label}
        <textarea
          name={name}
          className={input({ intent, error, className })}
          {...rest}
        ></textarea>

        {errorMessage && (
          <div className={styles.errorWrap}>
            <span className={styles.errorLabel}>{errorMessage}</span>
          </div>
        )}
      </label>
    </>
  );
}
