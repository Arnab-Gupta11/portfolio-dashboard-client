import { baseApi } from "@/redux/api/baseApi";

const messageManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //Get All Register semesters.
    getAllMessages: builder.query({
      query: () => {
        return {
          url: "/message",
          method: "GET",
        };
      },
      providesTags: ["message"],
    }),
    getMessageDetails: builder.query({
      query: (args) => {
        return {
          url: `/message/${args.id}`,
          method: "GET",
        };
      },
      providesTags: ["message"],
    }),

    // Add new Product
    addNewMessage: builder.mutation({
      query: (data) => ({
        url: "/message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),
  }),
});
export const { useAddNewMessageMutation, useGetAllMessagesQuery, useGetMessageDetailsQuery } = messageManagementApi;
