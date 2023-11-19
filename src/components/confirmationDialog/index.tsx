import { ReactNode } from "react";
import { Button } from "..";
import styles from "./confirmationDialog.module.scss";

interface Props {
  icon: ReactNode;
  message: string;
  cancelText: string;
  confirmText: string;
  subText: string;
  onClose: () => void;
  onOk: () => void;
}
export default function ConfirmationDialog({
  icon,
  message,
  cancelText,
  confirmText,
  subText,
  onClose,
  onOk,
}: Props) {
  return (
    <div className={styles.container}>
      {icon}
      <p className={styles.message}>{message}</p>
      <span className={styles.subText}>{subText}</span>
      <div className={styles.actions}>
        <Button intent="blur"  onClick={onClose}>
          {cancelText}
        </Button>
        <Button intent="danger"  onClick={onOk}>
          {confirmText}
        </Button>
      </div>
    </div>
  );
}
