import { baseApi } from "@/redux/api/baseApi";

const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //Create skill
    addSkill: builder.mutation({
      query: (skillData) => {
        return {
          url: "/skills",
          method: "POST",
          body: skillData,
        };
      },
      invalidatesTags: ["SKILLS"],
    }),

    //Get All Skills
    getAllSkills: builder.query({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
      providesTags: ["SKILLS"],
    }),
    //Get Skills details
    getSkillDetails: builder.query({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "GET",
      }),
      providesTags: ["SKILLS"],
    }),
    //Update Skills
    updateSkill: builder.mutation({
      query: ({ id, data }) => ({
        url: `/skills/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SKILLS"],
    }),
    //Delete Skills
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SKILLS"],
    }),
  }),
});

export const { useAddSkillMutation, useGetAllSkillsQuery, useGetSkillDetailsQuery, useDeleteSkillMutation, useUpdateSkillMutation } = skillsApi;
