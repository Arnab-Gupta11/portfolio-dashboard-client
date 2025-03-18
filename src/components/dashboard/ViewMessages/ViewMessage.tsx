"use client";
import React from "react";
import Loader from "@/components/shared/Loader/Loader";
import { useGetAllMessagesQuery } from "@/redux/features/message/message.api";
import { TMessage } from "@/types/message.types";
const ViewMessage = () => {
  const { data: messageData, isLoading, isFetching } = useGetAllMessagesQuery([]);

  return (
    <div>
      <div className="mb-5 flex flex-col xs:flex-row items-center xs:justify-between gap-5">
        <h1 className="text-2xl font-semibold text-light-primary-txt dark:text-dark-primary-txt">View Messages</h1>
      </div>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-sm pb-10">
          <table className="w-full border  mb-5 select-none -z-10">
            <thead className="bg-[#f2f9ff] dark:bg-[#101624]">
              <tr>
                <th className="px-4 py-2 text-left border dark:border-[#1e232e] border-slate-200">Name</th>
                <th className="px-4 py-2 text-left border  dark:border-[#1e232e] border-slate-200">Email</th>
                <th className="px-4 py-2 text-left border  dark:border-[#1e232e] border-slate-200">Phone No</th>
                <th className="px-4 py-2 text-left border  dark:border-[#1e232e] border-slate-200 w-[500px]">Message</th>
              </tr>
            </thead>
            <tbody>
              {messageData?.data?.map((item: TMessage) => (
                <tr key={item?._id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-secondary">
                  <td className="px-4 py-2 border dark:border-[#1e232e] border-slate-200">{item?.name}</td>
                  <td className="px-4 py-2 border dark:border-[#1e232e] border-slate-200 text-sm">{item?.email}</td>
                  <td className="px-4 py-2 border  dark:border-[#1e232e] border-slate-200 text-sm">{item?.phone}</td>
                  <td className="px-4 py-2 border  dark:border-[#1e232e] border-slate-200 text-sm">{item?.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewMessage;
