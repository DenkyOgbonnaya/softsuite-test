import { ReactNode } from "react";
import { Button } from "..";
import styles from "./dialog.module.scss";

interface Props {
  icon: ReactNode;
  message: string;
  actionText: string;
  onClose: () => void;
}
export default function Dialog({ icon, message, actionText, onClose }: Props) {
  return (
    <div className={styles.container}>
      {icon}
      <p className={styles.message}>{message}</p>

      <Button className={styles.actionBtn} onClick={onClose}>
        {actionText}
      </Button>
    </div>
  );
}
