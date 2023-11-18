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
  const pageCount = Math.ceil(totalCount / pageLimit);

  const handlePaginate = (selected: { selected: number }) => {
    onPaginate(selected.selected + 1);
  };
  return (
    <div className="paginationContainer">
      <div className="paginationActions">
        <p>Showing</p>
        <SelectInput className="paginationSelect" name="" defaultValue={pageLimit}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </SelectInput>
        <p>out of {totalCount}</p>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRight />}
        nextClassName="page"
        onPageChange={handlePaginate}
        pageRangeDisplayed={5}
        pageCount={pageCount}
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
