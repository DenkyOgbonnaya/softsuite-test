import { Lookup } from "@/types/lookups.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/contstants/environment";
import { HttpResponse } from "@/types/http.types";

export const lookupsApi = createApi({
  reducerPath: "lookupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getLookups: builder.query<HttpResponse<Lookup[]>, string>({
      query: () => `/lookups`,
    }),
  }),
});

export const { useGetLookupsQuery } = lookupsApi;
