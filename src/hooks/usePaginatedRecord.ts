import { useState } from "react";

function usePaginatedRecords<T>(records: T[], limit: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(records.length / limit);
  const offset = currentPage * limit - limit;
  const endPoint = offset + limit;
  const paginatedRecords = records.slice(offset, endPoint);

  return { paginatedRecords, totalPages, currentPage, setCurrentPage };
}

export default usePaginatedRecords;
