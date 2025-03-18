/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { BsThreeDots } from "react-icons/bs";

import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

import Link from "next/link";

import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteProjectMutation, useGetAllProjectsQuery } from "@/redux/features/projects/project.api";
import Loader from "@/components/shared/Loader/Loader";
import { TProject } from "@/types/project.types";
const ManageProjects = () => {
  const { data: projectData, isLoading, isFetching } = useGetAllProjectsQuery([]);
  const [deleteProject] = useDeleteProjectMutation(undefined);

  const handleDelete = (_id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteProject({ id: _id }).unwrap();
          if (res?.success === true) {
            Swal.fire("Your Project has been Deleted!", "success");
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete project. Please try again later.", "error");
        }
      }
    });
  };

  return (
    <div>
      <div className="mb-5 flex flex-col xs:flex-row items-center xs:justify-between gap-5">
        <h1 className="text-2xl font-semibold text-light-primary-txt dark:text-dark-primary-txt">Manage Projects</h1>
        <Link href="/dashboard/projects/add-project">
          <Button>
            <Plus />
            <span>Add Projects</span>
          </Button>
        </Link>
      </div>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-sm pb-10">
          <table className="w-full border dark:border-[#1e232e] border-slate-200 mb-5 select-none -z-10">
            <thead className="bg-[#f2f9ff] dark:bg-[#101624]">
              <tr>
                <th className="px-4 py-2 text-left border w-32  dark:border-[#1e232e] border-slate-200">Image</th>
                <th className="px-4 py-2 text-left border  dark:border-[#1e232e] border-slate-200">Name</th>
                <th className="px-4 py-2 text-left border  dark:border-[#1e232e] border-slate-200">Type</th>
                <th className="px-4 py-2 text-left border  dark:border-[#1e232e] border-slate-200">Technologies</th>
                <th className="px-4 py-2 text-left border dark:border-[#1e232e] border-slate-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {projectData?.data?.map((item: TProject) => (
                <tr key={item?._id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                  <td className="px-4 py-2 border w-32  dark:border-[#1e232e] border-slate-200">
                    <Image
                      src={item?.image}
                      width={20}
                      height={20}
                      alt="Product Image"
                      className="w-16 h-16 bg-[#F7F7F7] dark:bg-[#101624] p-2 rounded-lg flex-shrink-0"
                    />
                  </td>
                  <td className="px-4 py-2 border dark:border-[#1e232e] border-slate-200 text-sm">{item?.name}</td>
                  <td className="px-4 py-2 border  dark:border-[#1e232e] border-slate-200 text-sm">{item?.type}</td>
                  <td className="px-4 py-2 border  dark:border-[#1e232e] border-slate-200 text-sm">{item?.technologies}</td>
                  <td className="px-4 py-2 border w-20  dark:border-[#232935] border-slate-300">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none hover:scale-105 active:scale-95 duration-700">
                        <BsThreeDots className="mt-2" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="bottom"
                        className="bg-[#f7fbfe] dark:bg-[#101624] border-none shadow-md shadow-secondary-bg-light outline-none p-2 flex flex-col gap-2"
                      >
                        <Link href={`/dashboard/projects/${item?._id}`}>
                          <span className="text-slate-700 hover:text-slate-900 dark:text-dark-primary-txt dark:hover:text-dark-secondary-txt ">
                            Update
                          </span>
                        </Link>

                        <span
                          onClick={() => handleDelete(item?._id)}
                          className="text-slate-700 hover:text-slate-900 hover:cursor-pointer dark:text-dark-primary-txt dark:hover:text-dark-secondary-txt "
                        >
                          Delete
                        </span>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
