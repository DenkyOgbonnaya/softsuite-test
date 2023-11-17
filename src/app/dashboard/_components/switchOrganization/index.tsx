import styles from "./switchOrganization.module.scss";
import { ChevronDown, HomeIcon } from "@/assets";
import { DropDown } from "@/components";

export default function SwitchOrganization() {
  return (
    <div>
 <DropDown>
      <div className={styles.container}>
        <div className={styles.hstack}>
          <HomeIcon />
          <div className={styles.vstack}>
            <p className={styles.label}>Change Organization</p>
            <p className={styles.option}>PaperSoft Limited</p>
          </div>
        </div>
        <span>
          <ChevronDown />
        </span>
      </div>
    </DropDown>
    </div>
   
  );
}
