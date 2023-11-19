import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface HttpResponse<T> {
  status: string;
  message: string;
  error: unknown;
  data: T;
}

interface PaginatedResponse<T> {
  total: number;
  content: T;
}

export interface PaginatedHttpResponseData<T>
  extends HttpResponse<PaginatedResponse<T>> {}

export type MutationDataResponse<T> = { data: HttpResponse<T> };

export type MutationErrorResponse = {
  error: FetchBaseQueryError | SerializedError;
};

export interface HttpError {
  data: {
    response: {
      message: string;
    };
  };
}
