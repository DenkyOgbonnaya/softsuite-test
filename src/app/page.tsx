import Image from "next/image";
import styles from "./page.module.scss";
import { Button, DateInput, Input } from "./components";

export default function Home() {
  return (
    <main className={styles.main}>
      <Button size="medium" intent="primary">
        Hello World
      </Button>
      <Button isLoading size="medium" intent="primary">
        Hello World
      </Button>
      <Input
        name="FirstName"
        type="date"
        placeholder="First Name"
        label="Enter first name"
        error={true}
        errorMessage="Hello world"
      />
      <DateInput
        name="date"
        placeholder="State date"
        label="Enter first name"
        error={true}
        errorMessage="Hello world"
      />
    </main>
  );
}
