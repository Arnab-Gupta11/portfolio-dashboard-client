/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { BsThreeDots } from "react-icons/bs";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteProjectMutation, useGetAllProjectsQuery, useUpdateProjectsStatusMutation } from "@/redux/features/projects/project.api";
import Loader from "@/components/shared/Loader/Loader";
import { TProject } from "@/types/project.types";

import fallbackImg from "@/assets/fallback.png";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
const ManageProjects = () => {
  const [loading, setLoading] = useState(false);
  const { data: projectData, isLoading, isFetching } = useGetAllProjectsQuery([]);
  const [deleteProject] = useDeleteProjectMutation(undefined);
  const [updateStatus] = useUpdateProjectsStatusMutation(undefined);

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

  const handleStatusChange = async (_id: string) => {
    try {
      setLoading(true);
      console.log(_id);
      const res = await updateStatus(_id).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (projectData?.data?.length === 0) {
    return (
      <div className="min-h-svh w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-light-primary-txt dark:text-dark-primary-txt">
            It looks like you haven&apos;t added any project yet.
          </h1>
          <Link href="/projects/add-project">
            <Button className="mt-5">
              <Plus />
              <span>Add Your First Project</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-col xs:flex-row items-center xs:justify-between gap-5">
        <h1 className="text-2xl font-semibold text-light-primary-txt dark:text-dark-primary-txt">Manage Projects</h1>
        <Link href="/projects/add-project">
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
                <th className="px-4 py-2 text-left border  dark:border-[#1e232e] border-slate-200">Featured</th>
                <th className="px-4 py-2 text-left border dark:border-[#1e232e] border-slate-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {projectData?.data?.map((item: TProject) => (
                <tr key={item?._id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                  <td className="px-4 py-2 border w-32  dark:border-[#1e232e] border-slate-200">
                    <Image
                      src={item?.thumbnail || fallbackImg}
                      width={20}
                      height={20}
                      alt="Product Image"
                      className="w-16 h-16 bg-[#F7F7F7] dark:bg-[#101624] p-2 rounded-lg flex-shrink-0"
                    />
                  </td>
                  <td className="px-4 py-2 border dark:border-[#1e232e] border-slate-200 text-sm">{item?.title}</td>
                  <td className="px-4 py-2 border  dark:border-[#1e232e] border-slate-200 text-sm">{item?.type}</td>
                  <td className="px-4 py-2 border  dark:border-[#1e232e] border-slate-200 text-sm">{item?.technologies}</td>
                  <td className="px-4 py-2 border  dark:border-[#1e232e] border-slate-200 text-sm">
                    <span
                      className={`px-2 py-1 rounded-md text-sm
                          ${
                            item?.isFeatured === true
                              ? "bg-[#c7ffdf] dark:bg-[#76d29e] text-[#205615] border-2 border-[#64c950] dark:border-[#269010]"
                              : "bg-[#eef2f8] dark:bg-[#101624] text-light-primary-txt dark:text-dark-secondary-txt border-2 border-[#d1d2d5] dark:border-[#293553]"
                          }`}
                    >
                      {item?.isFeatured === true ? "Featured" : "Regular"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border w-20  dark:border-[#232935] border-slate-300">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none hover:scale-105 active:scale-95 duration-700">
                        <BsThreeDots className="mt-2" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="bottom"
                        className="bg-[#f7fbfe] dark:bg-[#101624] border-none shadow-md shadow-secondary-bg-light outline-none p-2 flex flex-col gap-2"
                      >
                        <span className="text-slate-700 hover:text-slate-900 dark:text-dark-primary-txt dark:hover:text-dark-secondary-txt border border-slate-300 dark:border-[#293553] px-2 rounded-md py-1 shadow-sm dark:dark:shadow-slate-800">
                          <Link href={`/projects/${item?._id}`}>Update</Link>
                        </span>

                        <span
                          onClick={() => handleDelete(item?._id)}
                          className="text-slate-700 hover:text-slate-900 hover:cursor-pointer dark:text-dark-primary-txt dark:hover:text-dark-secondary-txt border border-slate-300 dark:border-[#293553] px-2 rounded-md py-1 shadow-sm dark:dark:shadow-slate-800"
                        >
                          Delete
                        </span>
                        <span
                          onClick={() => handleStatusChange(item?._id)}
                          className="text-slate-700 hover:text-slate-900 hover:cursor-pointer dark:text-dark-primary-txt dark:hover:text-dark-secondary-txt border border-slate-300 dark:border-[#293553] px-2 rounded-md py-1 shadow-sm dark:dark:shadow-slate-800"
                        >
                          {loading ? <BiLoaderCircle className="animate-spin" /> : item?.isFeatured ? "Mark as Regular" : "Mark as Featured"}
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
