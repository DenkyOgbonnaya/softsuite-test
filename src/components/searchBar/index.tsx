import { SerachIcon } from "@/assets";
import styles from "./searchBar.module.scss";
import { ChangeEvent, ComponentProps, FormEvent, useState } from "react";

export interface SearchBarProps extends ComponentProps<"input"> {
  onSearch?: (value: string) => void;
}
export default function SearchBar({ onSearch, ...rest }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(value);
    }
  };
  return (
    <>
      <form onSubmit={handleSearch} className={styles.searchBar}>
        <input
          value={value}
          onChange={handleChange}
          required
          className={styles.input}
          {...rest}
        />
        <button className={styles.searchIcon} type="submit">
          <SerachIcon />
        </button>
      </form>
    </>
  );
}
