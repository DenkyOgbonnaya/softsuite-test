"use client";
import styles from "./page.module.scss";
import { Button } from "@/components";
import { ELEMENTS_ROUTE } from "@/contstants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href={ELEMENTS_ROUTE}>
        <Button size="medium" intent="primary">
          Goto Dashboard
        </Button>
      </Link>
    </main>
  );
}
