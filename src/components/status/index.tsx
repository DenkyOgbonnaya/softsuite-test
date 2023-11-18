import { cva, VariantProps } from "class-variance-authority";
import styles from "./status.module.scss";

const cvaProps = cva(styles.base, {
  variants: {
    intent: {
      active: styles.active,
      inactive: styles.inactive,
    },
  },

  defaultVariants: {
    intent: "active",
  },
});
interface Props extends VariantProps<typeof cvaProps> {
  status: string;
}
export default function Status({ status, intent }: Props) {
  return (
    <div className={cvaProps({intent})}>
      <span>{status}</span>
    </div>
  );
}
