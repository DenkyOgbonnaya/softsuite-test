"use client";
import { ReactNode } from "react";
import styles from "./layout.module.scss";
import { Sidebar } from "./_layouts";

interface Props {
  children: ReactNode;
}
export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <div className={styles.dashboard}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
