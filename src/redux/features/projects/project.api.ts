import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { TProject } from "@/types/project.types";

const blogManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //Get All Register semesters.
    getAllProjects: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/projects",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["projects"],
      transformResponse: (response: TResponseRedux<TProject[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getProjectsDetails: builder.query({
      query: (args) => {
        return {
          url: `/projects/${args.id}`,
          method: "GET",
        };
      },
      providesTags: ["projects"],
    }),

    // Add new Product
    addNewProjects: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),

    // Update Registered Semester
    updateProjects: builder.mutation({
      query: (args) => ({
        url: `/projects/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["projects"],
    }),

    //Delete Product
    deleteProject: builder.mutation({
      query: (args) => ({
        url: `/projects/${args.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});
export const { useGetAllProjectsQuery, useGetProjectsDetailsQuery, useAddNewProjectsMutation, useUpdateProjectsMutation, useDeleteProjectMutation } =
  blogManagementApi;
