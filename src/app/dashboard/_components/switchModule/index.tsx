import styles from "./switchMode.module.scss";
import { ChevronDown, SwitchIcon } from "@/assets";
import { DropDown } from "@/components";

export default function SwitchModule() {
  return (
    <DropDown>
        
      <div className={styles.switchMode}>
        <div className={styles.hstack}>
          <SwitchIcon />
          <div className={styles.vstack}>
            <p className={styles.label}>Switch Module</p>
            <p className={styles.option}>Payroll Management</p>
          </div>
        </div>
        <span>
          <ChevronDown />
        </span>
      </div>
      <p className={styles.option}>Loan Management</p>
    </DropDown>
  );
}
