import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/contstants/environment";
import { IElement } from "@/types/elements.types";
import { PaginatedHttpResponseData } from "@/types/http.types";

export const elementsApi = createApi({
  reducerPath: "elementsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getElements: builder.query<PaginatedHttpResponseData<IElement[]>, void>({
      query: () => `/elements`,
    }),
  }),
});

export const { useGetElementsQuery } = elementsApi;
