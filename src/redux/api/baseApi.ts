import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1", //"https://portfolio-server-psi-jet.vercel.app/api/v1",
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["blog", "projects", "message", "SKILLS"],
  endpoints: () => ({}),
});
