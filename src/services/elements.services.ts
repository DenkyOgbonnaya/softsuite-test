import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/contstants/environment";
import {
  CreateElentInput,
  EditElementInput,
  ElementLink,
  IElement,
} from "@/types/elements.types";
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
    updateElement: builder.mutation<HttpResponse<IElement>, EditElementInput>({
      query(data) {
        return {
          url: `/elements/${data.id}`,
          method: "PUT",
          credentials: "omit",
          body: data.data,
        };
      },
      invalidatesTags: ["elements"],
    }),
    deleteElement: builder.mutation<HttpResponse<IElement>, number>({
      query(id) {
        return {
          url: `/elements/${id}`,
          method: "DELETE",
          credentials: "omit",
        };
      },
      invalidatesTags: ["elements"],
    }),
    getElement: builder.query<HttpResponse<IElement>, string | number>({
      query: (id) => `/elements/${id}`,
    }),
    getElementLinks: builder.query<
      PaginatedHttpResponseData<ElementLink[]>,
      string | number
    >({
      query: (id) => `/elements/${id}/elementlinks`,
    }),
  }),
});

export const {
  useGetElementsQuery,
  useCreateElementMutation,
  useUpdateElementMutation,
  useDeleteElementMutation,
  useGetElementQuery,
  useGetElementLinksQuery,
} = elementsApi;
