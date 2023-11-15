import { cva, VariantProps } from "class-variance-authority";
import styles from "./button.module.scss";

const button = cva(styles.base, {
  variants: {
    intent: {
      primary: styles.primary,
      secondary: styles.secondary,
      outline: styles.outline,
      link: styles.link,
      icon: styles.icon
    },
    size: {
      small: styles.small,
      medium: styles.medium,
    },
  },
  compoundVariants: [
    { intent: "primary", size: "medium", class: "button--primary-small" },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children: React.ReactNode;
  isLoading?: boolean
}

export default function Button({
  children,
  isLoading,
  className,
  intent,
  size,
  ...rest
}: ButtonProps) {
  return (
    <button className={button({ intent, size, className })} {...rest}>
     {isLoading ? "Loading..." : children} 
    </button>
  );
}
