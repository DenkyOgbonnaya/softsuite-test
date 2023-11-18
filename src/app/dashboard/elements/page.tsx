"use client";
import {
  BreadCrumb,
  Button,
  Empty,
  Pagination,
  SearchBar,
  Status,
  Table,
  TableContainer,
  TableHead,
} from "@/components";
import styles from "./page.module.scss";
import NavBar from "../_layouts/navBar";
import { Filter, Plus } from "@/assets";
import { TableHeadProps } from "@/components/tableHead";

export default function Elements() {
  const pagePath = ["Payroll Management", "Element Setup", "Elements"];

  const tableHeadData: TableHeadProps["data"] = [
    {
      name: "Name",
      key: "name",
      sortable: true,
    },
    {
      name: "Element Category",
      key: "category",
      sortable: true,
    },
    {
      name: "Element Classification",
      key: "classification",
      sortable: true,
    },
    {
      name: "Status",
      key: "status",
      sortable: true,
    },
    {
      name: "Data & Time Modified",
      key: "date",
      sortable: true,
    },
    {
      name: "Modified By",
      key: "modifier",
      sortable: true,
    },
    {
      name: "Action",
      key: "",
    },
  ];

  const elements = ["1"];
  const active = "active";
  const inactive = "inactive";

  const handleSorting = (key: string) => {};

  const handlePagination = (page: number) => {};
  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <NavBar />
      </div>

      <div className={styles.main}>
        <BreadCrumb path={pagePath} />

        <div className={styles.card}>
          <h1 className={styles.title}>Elements</h1>
          <div className={styles.actions}>
            <div className={styles.hstack}>
              <SearchBar placeholder="Search for elements" />
              <Filter />
            </div>

            <Button size="medium">
              Create Element <Plus />{" "}
            </Button>
          </div>
          <>
            {elements.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead data={tableHeadData} onSort={handleSorting} />

                  <tbody>
                    <tr>
                      <td className={styles.td}>Annul Gross Element</td>
                      <td className={styles.td}>Deduction</td>
                      <td className={styles.td}>Pre tax</td>
                      <td className={styles.td}>
                        <Status status="active" intent="active" />
                      </td>
                      <td className={styles.td}>14 - 02 - 2022 || 09:30 AM</td>
                      <td className={styles.td}>Samson Ayorinde</td>
                      <td className={styles.td}>more</td>
                    </tr>
                    <tr>
                      <td className={styles.td}>Annul Gross Element</td>
                      <td className={styles.td}>Deduction</td>
                      <td className={styles.td}>Pre tax</td>
                      <td className={styles.td}>
                        <Status status={inactive} intent={inactive} />
                      </td>
                      <td className={styles.td}>14 - 02 - 2022 || 09:30 AM</td>
                      <td className={styles.td}>Samson Ayorinde</td>
                      <td className={styles.td}>more</td>
                    </tr>
                    <tr>
                      <td className={styles.td}>Annul Gross Element</td>
                      <td className={styles.td}>Deduction</td>
                      <td className={styles.td}>Pre tax</td>
                      <td className={styles.td}>
                        <Status status={active} intent={"inactive"} />
                      </td>
                      <td className={styles.td}>14 - 02 - 2022 || 09:30 AM</td>
                      <td className={styles.td}>Samson Ayorinde</td>
                      <td className={styles.td}>more</td>
                    </tr>
                  </tbody>
                </Table>
               
              </TableContainer>
            ) : (
              <div className={styles.empty}>
                <Empty message="There are no elements to display" />
              </div>
            )}
             <Pagination
                  currentPage={1}
                  totalCount={30}
                  pageLimit={10}
                  onPaginate={handlePagination}
                />
          </>
        </div>
      </div>
    </div>
  );
}
