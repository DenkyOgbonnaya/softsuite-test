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
  TableLoader,
} from "@/components";
import styles from "./page.module.scss";
import NavBar from "../_layouts/navBar";
import { Filter, MoreIcon, Plus, SuccessCheck } from "@/assets";
import { TableHeadProps } from "@/components/tableHead";
import {
  useCreateElementMutation,
  useGetElementsQuery,
} from "@/services/elements.services";
import { formatDate } from "@/utills/date";
import { usePaginatedRecords } from "@/hooks";
import { CreateElentInput, IElement } from "@/types/elements.types";
import { useState } from "react";
import OVerlay from "@/components/overlay";
import ElementForm from "./_components/elementForm";
import Dialog from "@/components/dialog";
import {
  HttpError,
  MutationDataResponse,
  MutationErrorResponse,
} from "@/types/http.types";

export default function Elements() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErroMessage] = useState("");

  const { isLoading, data } = useGetElementsQuery();
  const [createElement, createElementRes] = useCreateElementMutation();
  const LIMIT = 10;

  const { paginatedRecords, totalPages, setCurrentPage, currentPage } =
    usePaginatedRecords<IElement>(data?.data?.content ?? [], LIMIT);

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

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const toggleCreateSuccess = () => {
    setShowCreateSuccess(!showCreateSuccess);
  };

  const elements = ["1"];

  const status: Record<string, "active" | "inactive"> = {
    active: "active",
    inactive: "inactive",
  };

  const handleSorting = (key: string) => {};

  const handleCreateElement = async (data: IElement) => {
    const payload: CreateElentInput = {
      ...data,
      modifiedBy: "Dennis Ogbonnaya",
    };
    const response = await createElement(payload);

    const responseData = response as MutationDataResponse<IElement>;
    const responseError = response as MutationErrorResponse;

    if (responseData) {
      setSuccessMessage(responseData.data.message);
      toggleCreateForm();
      toggleCreateSuccess();
    }

    if (responseError) {
      const error = responseError.error as HttpError;
      setErroMessage(error?.data?.response?.message);
    }
  };

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

            <Button size="medium" onClick={toggleCreateForm}>
              Create Element <Plus />{" "}
            </Button>
          </div>
          <>
            {elements.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead data={tableHeadData} onSort={handleSorting} />

                  <tbody>
                    <TableLoader
                      isLoading={isLoading}
                      colSpan={tableHeadData.length}
                    >
                      <>
                        {paginatedRecords?.map((element) => (
                          <tr key={element.name} className={styles.tr}>
                            <td>{element.name}</td>
                            <td>{element.categoryId}</td>
                            <td>{element.classificationId}</td>
                            <td>
                              {" "}
                              <Status
                                status={element.status}
                                intent={
                                  status[
                                    element.status?.toString().toLowerCase()
                                  ]
                                }
                              />
                            </td>
                            <td>{formatDate(element.effectiveStartDate)}</td>
                            <td>{element.modifiedBy}</td>
                            <td>
                              <MoreIcon />
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
            <Pagination
              currentPage={currentPage}
              totalCount={totalPages}
              pageLimit={LIMIT}
              onPaginate={setCurrentPage}
            />
          </>
        </div>
      </div>
      <OVerlay visible={showCreateForm}>
        <ElementForm
          onClose={toggleCreateForm}
          onSubmit={handleCreateElement}
          isLoading={createElementRes.isLoading}
          erroMessage={errorMessage}
        />
      </OVerlay>
      <OVerlay visible={showCreateSuccess}>
        <Dialog
          onClose={toggleCreateSuccess}
          message={successMessage}
          actionText="Close to continue"
          icon={<SuccessCheck />}
        />
      </OVerlay>
    </div>
  );
}
