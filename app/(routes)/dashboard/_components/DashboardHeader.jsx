import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu, MenuIcon, ScanSearch } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
// import Router from "next/router";
import { useRouter } from "next/navigation";
import SideNav from "./SideNav";
function DashboardHeader({ toggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleClick = () => {
    router.replace(`/dashboard/budgets?search=${searchQuery}`);
  };
  // const toggleSidebar = null;
  return (
    <div className="flex justify-between p-5 shadow-sm border-b items-center">
      <div className="flex items-center">
        <button className="mr-4 lg:hidden" onClick={toggleSidebar}>
          <Menu size={32} />
        </button>
        <div
          className="border rounded-lg flex items-center w-[250px]"
          onClick={toggleSidebar}
        >
          <Button className="bg-primary border-none" onClick={handleClick}>
            <ScanSearch />
          </Button>
          <Input
            className="border-transparent focus-visible:outline-none focus:ring-0"
            placeholder="search bar"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
