import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/contstants/environment";
import { CreateElentInput, IElement } from "@/types/elements.types";
import { HttpResponse, PaginatedHttpResponseData } from "@/types/http.types";

export const elementsApi = createApi({
  reducerPath: "elementsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["elements"],
  endpoints: (builder) => ({
    getElements: builder.query<PaginatedHttpResponseData<IElement[]>, void>({
      query: () => `/elements`,
      providesTags: ["elements"],
    }),
    createElement: builder.mutation<HttpResponse<IElement>, CreateElentInput>({
      query(data) {
        return {
          url: "/elements",
          method: "POST",
          credentials: "omit",
          body: data,
        };
      },
      invalidatesTags: ["elements"],
    }),
  }),
});

export const { useGetElementsQuery, useCreateElementMutation } = elementsApi;
