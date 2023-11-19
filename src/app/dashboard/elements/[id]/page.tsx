"use client";
import {
  BreadCrumb,
  Button,
  Empty,
  Pagination,
  SearchBar,
  Table,
  TableContainer,
  TableHead,
  TableLoader,
} from "@/components";
import styles from "./page.module.scss";
import NavBar from "../../_layouts/navBar";
import { BackArrow, DeleteIcon, Filter, Pencil, Plus, Trash } from "@/assets";
import {
  useGetElementLinksQuery,
  useGetElementQuery,
} from "@/services/elements.services";
import { useParams } from "next/navigation";
import { usePaginatedRecords } from "@/hooks";
import { ElementLink } from "@/types/elements.types";
import { TableHeadProps } from "@/components/tableHead";
import { formatAmount } from "@/utills/helpers";
import Link from "next/link";
import { ELEMENTS_ROUTE } from "@/contstants/routes";

const pagePath = [
  "Payroll Management",
  "Element Setup",
  "Elements",
  "Element Links",
];

export default function ElementLinks() {
  const id = useParams().id as string;

  const { isLoading, data: element } = useGetElementQuery(id, { skip: !id });
  const { isLoading: loadingLinks, data: elementLinks } =
    useGetElementLinksQuery(id, { skip: !id });
  const LIMIT = 10;

  const { paginatedRecords, totalPages, setCurrentPage, currentPage } =
    usePaginatedRecords<ElementLink>(elementLinks?.data?.content ?? [], LIMIT);

  const handleSorting = (key: string) => {};

  const tableHeadData: TableHeadProps["data"] = [
    {
      name: "Name",
      key: "name",
      sortable: true,
    },
    {
      name: "Sub-Organization",
      key: "org",
      sortable: true,
    },
    {
      name: "Department",
      key: "dept",
      sortable: true,
    },
    {
      name: "Employee Category",
      key: "cate",
      sortable: true,
    },
    {
      name: "Amount",
      key: "amt",
      sortable: true,
    },
    {
      name: "Details",
      key: "detas",
      sortable: true,
    },
    {
      name: "Action",
      key: "",
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.navBar}>
          <NavBar />
        </div>

        <div className={styles.main}>
          <BreadCrumb path={pagePath} />

          <div className={styles.card}>
            <Link href={ELEMENTS_ROUTE}>
              <BackArrow />
            </Link>

            <h1 className={styles.title}>Elements Details</h1>
            <TableContainer>
              <table className={styles.table}>
                <tbody>
                  <TableLoader isLoading={isLoading} colSpan={2}>
                    <>
                      <tr className={styles.tr}>
                        <td>
                          <div>
                            <span>Element Name</span>
                            <span>{element?.data?.name}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>element Classification</span>
                            <span>{element?.data?.classificationId}</span>
                          </div>
                        </td>
                      </tr>

                      <tr className={styles.tr}>
                        <td>
                          <div>
                            <span>ELEMENT category</span>
                            <span>{element?.data?.categoryId}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>payrun</span>
                            <span>
                              {" "}
                              <span>{element?.data?.payRunId}</span>
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr className={styles.tr}>
                        <td>
                          <div>
                            <span>description</span>
                            <span>Mecury</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>reporting Name</span>
                            <span>{element?.data?.reportingName}</span>
                          </div>
                        </td>
                      </tr>

                      <tr className={styles.tr}>
                        <td>
                          <div>
                            <span>Effective Start Date</span>
                            <span>{element?.data?.effectiveStartDate}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>Effective END Date</span>
                            <span>{element?.data?.effectiveEndDate}</span>
                          </div>
                        </td>
                      </tr>

                      <tr className={styles.tr}>
                        <td>
                          <div>
                            <span>PROCESSING TYPE</span>
                            <span>{element?.data?.processingType}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>PAY frequency</span>
                            <span>{element?.data?.payFrequency}</span>
                          </div>
                        </td>
                      </tr>

                      <tr className={styles.tr}>
                        <td>
                          <div>
                            <span>Pay Months</span>
                            <span>{element?.data?.selectedMonths}</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>Prorate</span>
                            <span>{element?.data?.prorate}</span>
                          </div>
                        </td>
                      </tr>

                      <tr className={styles.tr}>
                        <td>
                          <div>
                            <span>Status</span>
                            <span>{element?.data?.status}</span>
                          </div>
                        </td>
                      </tr>
                    </>
                  </TableLoader>
                </tbody>
              </table>
            </TableContainer>

            <h1 className={styles.title}>Elements Links</h1>
            <div className={styles.actions}>
              <div className={styles.hstack}>
                <SearchBar placeholder="Search for elements" />
                <Filter />
              </div>

              <Button size="medium">
                Create Element Link <Plus />{" "}
              </Button>
            </div>

            {paginatedRecords.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead data={tableHeadData} onSort={handleSorting} />

                  <tbody>
                    <TableLoader
                      isLoading={loadingLinks}
                      colSpan={tableHeadData.length}
                    >
                      <>
                        {paginatedRecords?.map((element) => (
                          <tr key={element.name} className={styles.tr}>
                            <td>{element.name}</td>
                            <td>{element.suborganizationId}</td>
                            <td>{element.departmentId}</td>
                            <td>{element.employeeCategoryId}</td>
                            <td>NGN {formatAmount(element.amount)}</td>
                            <td>
                              <Button className={styles.viewLink} intent="link">
                                View details
                              </Button>
                            </td>
                            <td>
                              <span className={styles.hstack}>
                                <Pencil />
                                <DeleteIcon />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </>
                    </TableLoader>
                  </tbody>
                </Table>
              </TableContainer>
            ) : (
              <div className={styles.empty}>
                <Empty message="There are no elements to display" />
              </div>
            )}
            {paginatedRecords.length ? (
              <Pagination
                currentPage={currentPage}
                totalCount={totalPages}
                pageLimit={LIMIT}
                onPaginate={setCurrentPage}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
