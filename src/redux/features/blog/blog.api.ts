import { baseApi } from "@/redux/api/baseApi";
import { TBlog } from "@/types/blog.types";
import { TQueryParam, TResponseRedux } from "@/types/global";

const blogManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //Get All Register semesters.
    getAllBlogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/blogs",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["blog"],
      transformResponse: (response: TResponseRedux<TBlog[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getBlogDetails: builder.query({
      query: (args) => {
        return {
          url: `/blogs/${args.id}`,
          method: "GET",
        };
      },
      providesTags: ["blog"],
    }),

    // Add new Product
    addNewBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),

    // Update Registered Semester
    updateBlog: builder.mutation({
      query: (args) => ({
        url: `/blogs/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["blog"],
    }),

    //Delete Product
    deleteBlog: builder.mutation({
      query: (args) => ({
        url: `/blogs/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});
export const { useGetAllBlogsQuery, useAddNewBlogMutation, useGetBlogDetailsQuery, useUpdateBlogMutation, useDeleteBlogMutation } = blogManagementApi;
