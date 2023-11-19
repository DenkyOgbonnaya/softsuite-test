import { Lookup, LookupValue } from "@/types/lookups.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/contstants/environment";
import { HttpResponse } from "@/types/http.types";

export const lookupsApi = createApi({
  reducerPath: "lookupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getLookups: builder.query<HttpResponse<Lookup[]>, void>({
      query: () => `/lookups`,
    }),
    getLookupsValues: builder.query<LookupValue[], number | string>({
      query: (id: number | string) => `/lookups/${id}/lookupvalues`,
    }),
  }),
});

export const { useGetLookupsQuery, useGetLookupsValuesQuery } = lookupsApi;
