import { FC } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.scss";
import { ChevronLeft, ChevronRight } from "@/assets";
import { SelectInput } from "..";

interface Props {
  onPaginate: (page: number) => void;
  totalCount: number;
  pageLimit: number;
  currentPage: number;
}
const Pagination: FC<Props> = ({
  onPaginate,
  pageLimit = 10,
  totalCount = 0,
  currentPage = 1,
}) => {
  const handlePaginate = (selected: { selected: number }) => {
    onPaginate(selected.selected + 1);
  };
  return (
    <div className="paginationContainer">
      <div className="paginationActions">
        <p>Showing</p>
        <SelectInput
          className="paginationSelect"
          placeholder=""
          onChangeHandler={({ target }) => {}}
          options={[{ label: "10", value: 10 }]}
          name=""
          value={pageLimit}
        />

        <p>out of {totalCount * pageLimit}</p>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRight />}
        nextClassName="page"
        onPageChange={handlePaginate}
        pageRangeDisplayed={5}
        pageCount={totalCount}
        previousLabel={<ChevronLeft />}
        previousClassName="page"
        renderOnZeroPageCount={null}
        pageClassName="page"
        breakClassName={"break-me"}
        activeClassName={"active"}
        containerClassName={"pagination"}
      />
    </div>
  );
};

export default Pagination;
