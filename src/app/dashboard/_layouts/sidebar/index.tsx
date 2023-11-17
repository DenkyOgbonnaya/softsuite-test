import { Logo } from "@/assets";
import styles from "./sidebar.module.scss"
import SwitchModule from "../../_components/switchModule";
import SidebarContent from "../sidebarContent";

export default function Sidebar() {
  return (
    <>
      <div className={styles.sidebar}>
        <div>
        <Logo />
        </div>
       
        <div>
        <SwitchModule />
        </div>
       
        <div>
        <SidebarContent />
        </div>
       
      </div>
    </>
  );
}
