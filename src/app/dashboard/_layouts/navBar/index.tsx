import styles from "./navBar.module.scss";
import SwitchOrganization from "../../_components/switchOrganization";
import { SearchBar } from "@/components";
import { Bell } from "@/assets";
import UserMenu from "../../_components/userMenu";

export default function NavBar() {
  return (
    <div className={styles.container}>
      <div className={styles.hstack}>
      <SwitchOrganization />
      <SearchBar placeholder="Search for anyting..." />
      </div>

      <div className={styles.hstack}>
        <Bell />
        <UserMenu />

      </div>
      
    </div>
  );
}
