import { elementsApi } from "@/services/elements.services";
import { lookupsApi } from "@/services/lookups.services";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
  reducer: {
    [lookupsApi.reducerPath]: lookupsApi.reducer,
    [elementsApi.reducerPath]: elementsApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      lookupsApi.middleware,
      elementsApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
