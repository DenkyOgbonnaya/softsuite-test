'use client'
import Dropdown from "@/components/dropDown";
import styles from "./page.module.scss";
import {
  Button,
  DateInput,
  Input,
  RadioButton,
  SearchBar,
  SelectInput,
  Switch,
} from "@/components";

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
      <SelectInput name="selec" label="Select one" error>
        <option value="hell">Hello man</option>
        <option value="why">Why man</option>
      </SelectInput>

      <div>
        <RadioButton label="Hello" name="hello" value="yes" />
        <RadioButton label="World" name="hello" value="No" />
      </div>

      <Switch name="hello" label="Active" />
      <SearchBar placeholder="Search something..." />

      <Dropdown>
      <p>Hello</p>
       <p>World</p>
        <p>Yes</p>
      </Dropdown>
    </main>
  );
}
