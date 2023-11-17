"use client";
import styles from "./page.module.scss";

import NavBar from "./_layouts/navBar";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.main}>
        <h3>Empty Dashbord, goto Element Setup {"===>"} Elements</h3>
      </div>
    </div>
  );
}
