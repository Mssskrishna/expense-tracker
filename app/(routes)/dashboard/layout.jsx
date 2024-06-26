"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { Budgets } from "../../../utils/schema";
import { db } from "../../../utils/dbConfig";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user.id)); // Assuming user.id is the correct identifier
    if (result?.length === 0) {
      router.replace("/dashboard/budgets");
    }
    console.log(result);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        ref={sidebarRef}
        className={`fixed md:w-64 ${isSidebarOpen || window.innerWidth > 768 ? "block" : "hidden"} z-20 bg-slate-50`}
      >
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
