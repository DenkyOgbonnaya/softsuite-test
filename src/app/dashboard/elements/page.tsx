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
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import styles from "./page.module.scss";
import NavBar from "../_layouts/navBar";
import {
  DeleteIcon,
  Eye,
  Filter,
  MoreIcon,
  Pencil,
  Plus,
  SuccessCheck,
} from "@/assets";
import { TableHeadProps } from "@/components/tableHead";
import {
  useCreateElementMutation,
  useGetElementsQuery,
  useUpdateElementMutation,
} from "@/services/elements.services";
import { formatDate } from "@/utills/date";
import { usePaginatedRecords } from "@/hooks";
import {
  CreateElentInput,
  IElement,
  EditElementInput,
} from "@/types/elements.types";
import { useState } from "react";
import OVerlay from "@/components/overlay";
import ElementForm from "./_components/elementForm";
import Dialog from "@/components/dialog";
import {
  HttpError,
  MutationDataResponse,
  MutationErrorResponse,
} from "@/types/http.types";
import "@szhsin/react-menu/dist/index.css";

interface ToggleState {
  showCreate: boolean;
  showSuccess: boolean;
  showEdit: boolean;
  showDelete: boolean;
}

export default function Elements() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErroMessage] = useState("");
  const [editableElement, setEditableElement] = useState<IElement | null>(null);
  const [toggleState, setToggleState] = useState<ToggleState>({
    showCreate: false,
    showDelete: false,
    showEdit: false,
    showSuccess: false,
  });

  const { isLoading, data } = useGetElementsQuery();
  const [createElement, createElementRes] = useCreateElementMutation();
  const [updateElement, updateElementRes] = useUpdateElementMutation();
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
  const handleToggle = (key: keyof ToggleState) => {
    setToggleState((state) => ({ ...state, [key]: !state[key] }));
  };

  const onEditElement = (element: IElement) => {
    setEditableElement(() => element);

    handleToggle("showEdit");
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
      handleToggle("showCreate");
      handleToggle("showSuccess");
      setCurrentPage(0);
    }

    if (responseError) {
      const error = responseError.error as HttpError;
      setErroMessage(error?.data?.response?.message);
    }
  };

  const handleUpdateElement = async (data: IElement) => {
    const payload: EditElementInput = {
      data,
      id: editableElement?.id!,
    };
    const response = await updateElement(payload);

    const responseData = response as MutationDataResponse<IElement>;
    const responseError = response as MutationErrorResponse;

    if (responseData) {
      setSuccessMessage(responseData.data.message);
      handleToggle("showEdit");
      handleToggle("showSuccess");
      setCurrentPage(0);
      setEditableElement(null)
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

            <Button size="medium" onClick={() => handleToggle("showCreate")}>
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
                              <Menu
                                menuButton={
                                  <MenuButton className={styles.menuBtn}>
                                    <MoreIcon />
                                  </MenuButton>
                                }
                                className={styles.menu}
                              >
                                <MenuItem className={styles.menuItem}>
                                  <Eye />
                                  View Element Links
                                </MenuItem>
                                <MenuItem
                                  className={styles.menuItem}
                                  onClick={() => onEditElement(element)}
                                >
                                  <Pencil />
                                  Edit Element
                                </MenuItem>
                                <MenuItem
                                  className={`${styles.menuItem} ${styles.deleteMenu}`}
                                >
                                  <DeleteIcon />
                                  Delete Element
                                </MenuItem>
                              </Menu>
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
      <OVerlay visible={toggleState.showCreate}>
        <ElementForm
          onClose={() => handleToggle("showCreate")}
          onSubmit={handleCreateElement}
          isLoading={createElementRes.isLoading}
          erroMessage={errorMessage}
        />
      </OVerlay>
      <OVerlay visible={toggleState.showEdit}>
        <ElementForm
          onClose={() => handleToggle("showEdit")}
          data={editableElement!}
          onSubmit={handleUpdateElement}
          isLoading={updateElementRes.isLoading}
          erroMessage={errorMessage}
        />
      </OVerlay>
      <OVerlay visible={toggleState.showSuccess}>
        <Dialog
          onClose={() => handleToggle("showSuccess")}
          message={successMessage}
          actionText="Close to continue"
          icon={<SuccessCheck />}
        />
      </OVerlay>
    </div>
  );
}
