/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type TSidebarMenuItem = {
  label: string;
  path: string;
  show: boolean;
  Icon: any;
};
const SidebarItem = ({ menuItem }: { menuItem: TSidebarMenuItem }) => {
  const pathname = usePathname();
  const { Icon } = menuItem;
  return (
    <Link
      href={menuItem.path}
      className={`font-medium ${
        pathname === menuItem.path
          ? "text-primary text-lg"
          : "text-light-primary-txt dark:text-dark-primary-txt hover:text-primary duration-500 ease-in-out text-base"
      }`}
    >
      <div className="justify-start px-4 py-2 rounded-lg flex items-center gap-2">
        <Icon size={14} />
        <span>{menuItem?.label}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
