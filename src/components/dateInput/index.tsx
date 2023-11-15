import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./dateInput.module.scss";
import { CalendarIcon } from "@/assets";

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

export interface DateInputProps
  extends ComponentProps<"input">,
    VariantProps<typeof input> {
  name: string;
  label?: string;
  errorMessage?: string;
}
export default function DateInput({
  name,
  label,
  errorMessage,
  className,
  intent,
  error,
  ...rest
}: DateInputProps) {
  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {label && label}
        <input
          name={name}
          className={input({ intent, error, className })}
          type="date"
          {...rest}
        />
        <span className={styles.dateIcon}>
          <CalendarIcon />
        </span>
        {errorMessage && (
          <div className={styles.errorWrap}>
            <span className={styles.errorLabel}>{errorMessage}</span>
          </div>
        )}
      </label>
    </>
  );
}
