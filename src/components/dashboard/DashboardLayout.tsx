"use client";
import { HiOutlineLogout } from "react-icons/hi";
import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BiHome } from "react-icons/bi";
import { FaBlog, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import SidebarItem from "@/components/dashboard/shared/SidebarItem";
import { ThemeToggler } from "../shared/ThemeToggler/ThemeTogler";
import { signOut } from "next-auth/react";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const menuItems = [
    {
      label: "Manage Blogs",
      path: "/blogs",
      show: true,
      Icon: FaBlog, // 📝 Blog Icon
    },
    {
      label: "Manage Projects",
      path: "/projects",
      show: true,
      Icon: FaProjectDiagram, // 📁 Project Icon
    },
    {
      label: "View Messages",
      path: "/messages",
      show: true,
      Icon: FaEnvelope, // ✉️ Message Icon
    },
  ];
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-[#F4F8FB] dark:bg-dark-bg-primary transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0 lg:fixed`}
      >
        <div className="flex items-center justify-between p-4 ">
          <div className="ml-5">
            <span className="text-light-primary-txt dark:text-dark-primary-txt text-4xl font-bold">
              A<span className="text-primary">G</span>
            </span>
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </Button>
        </div>
        <nav className="flex flex-col p-4 space-y-1.5">
          {menuItems.map((menuItem, idx) => {
            return menuItem.show ? <SidebarItem key={idx} menuItem={menuItem} /> : null;
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 lg:ml-64">
        {/* Navbar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#F4F8FB] dark:bg-dark-bg-primary shadow-md">
          <div>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex items-center pl-5 gap-5">
            <Link className="" href={"/"}>
              <BiHome className="text-xl text-light-primary-txt dark:text-dark-primary-txt hover:scale-105 hover:cursor-pointer shadow-md w-9 h-9 p-2 rounded-md dark:shadow-slate-800" />
            </Link>
            <ThemeToggler />
            <span onClick={() => signOut()} className="cursor-pointer shadow-md w-9 h-9 p-2 rounded-md dark:shadow-slate-800">
              <HiOutlineLogout className=" text-red-600 text-2xl" />
            </span>
            {/* <ProfileAvatar /> */}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg">
          <div className="p-4 bg-[#F4F8FB] dark:bg-dark-bg-primary rounded-lg shadow-md dark:shadow-slate-900 min-h-screen">{children}</div>
        </main>
      </div>
    </div>
  );
}
