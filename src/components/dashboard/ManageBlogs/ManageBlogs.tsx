/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { BsThreeDots } from "react-icons/bs";

import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

import { useDeleteBlogMutation, useGetAllBlogsQuery } from "@/redux/features/blog/blog.api";
import Link from "next/link";
import Loader from "@/components/shared/Loader/Loader";
import { TBlog } from "@/types/blog.types";
import Image from "next/image";
import { formateDateTime } from "@/utils/formateDateTime";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const ManageBlogs = () => {
  const { data: blogData, isLoading, isFetching } = useGetAllBlogsQuery([]);
  // const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(e.target.value);
  // };
  const [deleteBlog] = useDeleteBlogMutation(undefined);

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
          const res = await deleteBlog({ id: _id }).unwrap();
          if (res?.success === true) {
            Swal.fire("Your Blog has been Deleted!", "success");
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete Blog. Please try again later.", "error");
        }
      }
    });
  };

  return (
    <div>
      <div className="mb-5 flex flex-col xs:flex-row items-center xs:justify-between gap-5">
        <h1 className="text-2xl font-semibold text-light-primary-txt dark:text-dark-primary-txt">Manage Blogs</h1>
        <Link href="/dashboard/blogs/add-blog">
          <Button>
            <Plus />
            <span>Add Blog</span>
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
                <th className="px-4 py-2 text-left border  dark:border-[#1e232e] border-slate-200">Title</th>
                <th className="px-4 py-2 text-left border  dark:border-[#1e232e] border-slate-200">Category</th>
                <th className="px-4 py-2 text-left border  dark:border-[#1e232e] border-slate-200">Date</th>
                <th className="px-4 py-2 text-left border dark:border-[#1e232e] border-slate-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogData?.data?.map((item: TBlog) => (
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
                  <td className="px-4 py-2 border dark:border-[#1e232e] border-slate-200 text-sm">{item?.title}</td>
                  <td className="px-4 py-2 border  dark:border-[#1e232e] border-slate-200 text-sm">{item?.category}</td>
                  <td className="px-4 py-2 border  dark:border-[#1e232e] border-slate-200 text-sm">{formateDateTime(item?.createdAt)}</td>
                  <td className="px-4 py-2 border w-20  dark:border-[#232935] border-slate-300">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none hover:scale-105 active:scale-95 duration-700">
                        <BsThreeDots className="mt-2" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="bottom"
                        className="bg-[#f7fbfe] dark:bg-[#101624] border-none shadow-md shadow-secondary-bg-light outline-none p-2 flex flex-col gap-2"
                      >
                        <Link href={`/dashboard/blogs/${item?._id}`}>
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

export default ManageBlogs;
