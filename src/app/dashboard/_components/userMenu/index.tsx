import Avatar from "@/components/avatar";
import styles from "./userMenu.module.scss";

export default function UserMenu() {
  const user = {
    name: "Henry Okoro",
    role: "Payroll Manager",
    profilePicture: "",
  };
  return (
    <div className={styles.hstack}>
      <Avatar url={user.profilePicture} alt={user.name} />
      <div className={styles.vstack}>
        <p className={styles.label}>{user.name}</p>
        <p className={styles.option}>{user.role}</p>
      </div>
    </div>
  );
}
