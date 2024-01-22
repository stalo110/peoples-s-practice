import React, { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import ProfileCard from "../layouts/ProfileCard";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const onToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen bg-[#D9DBE9]">
      <div className="">
        {/* <!-- Sidebar --> */}
        <Sidebar show={showSidebar} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <!-- Header --> */}
        <Header onToggleSidebar={onToggleSidebar} />
        <ProfileCard />
      </div>
    </div>
  );
};

export default Dashboard;