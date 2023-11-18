import { Sort } from "@/assets";
import styles from "./tableHead.module.scss";

export interface TableHeadProps {
  data: {
    name: string;
    key: string;
    sortable?: boolean;
  }[];
  onSort?: (key: string) => void;
}

export default function TableHead({ data, onSort }: TableHeadProps) {
  const handleSort = (key: string) => {
    if (onSort) onSort(key);
  };
  return (
    <thead className={styles.container}>
      <tr>
        {data.map(({ name, key, sortable }, index) => (
          <th key={index} className={styles.th}>
            <div className={styles.hstack}>
              {name}
              {sortable && (
                <button
                  className={styles.sortIco}
                  onClick={() => handleSort(key)}
                >
                  <Sort />
                </button>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
