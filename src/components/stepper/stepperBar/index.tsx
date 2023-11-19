import { FC, ReactNode } from "react";
import styles from "./stepperBar.module.scss";

interface Props {
  children: ReactNode;
}
const StepperBar: FC<Props> = ({ children }) => {
  return <div className={styles.progressBar}>{children}</div>;
};

export default StepperBar;
