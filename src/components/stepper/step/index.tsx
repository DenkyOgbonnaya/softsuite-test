import { FC } from "react";
import styles from "./step.module.scss";

interface Props {
  isActive: boolean;
  isComplete: boolean;
  title: string;
}
const Step: FC<Props> = ({ title, isComplete, isActive }) => {
  return (
    <div
      className={`${styles.stepperItem}  ${isActive && `${styles.active}`} ${
        isComplete && `${styles.completed}`
      } `}
    >
      <div className={styles.stepCounter} />
      <div className={styles.stepName}> {title} </div>
    </div>
  );
};

export default Step;
