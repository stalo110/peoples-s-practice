import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../asset/Logo.png";
import dashboard from "../asset/dashboard.png";
import wallet from "../asset/wallet.png";
import setting from "../asset/settings.png";
import transaction from "../asset/transaction.png";
import logout from "../asset/logout.png";
import { LogOut } from "../utils/firebase/AuthFirestore";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";

const Sidebar = ({ show }: { show: boolean }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSignOut = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await LogOut();
    if (res.error === false) {
      setTimeout(() => setLoading(false), 1000);
      toast.success("Logout Successful!");
      setTimeout(() => navigate('/'), 1200);
    }else{
      setLoading(false);
      toast.error("Logout Failed!");
    }
  };
  return (
    <>
      {loading && <Spinner />}
      <aside
        className={`${
          show ? "translate-x-0" : "-translate-x-full"
        } pt-20 transform fixed h-full w-64 bg-[#054B98;] p-4 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
         <Link to="/" >
         <img src={logo} alt="logo" />
         </Link>
          </div>
        </div>
        <nav className="mt-10 flex-col space-y-[40px]">
          <NavLink
            to="/dashboard"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            <div className="flex items-center">
              <img
                src={dashboard}
                alt="dashboard"
                className="mr-3 h-[18px] w-[18px]"
              />
              <span>Dashboard</span>
            </div>
          </NavLink>
          <NavLink
            to="/profile"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            <div className="flex items-center">
              <img
                src={wallet}
                alt="wallet"
                className="mr-3 h-[18px] w-[18px]"
              />
              <span>Wallet</span>
            </div>
          </NavLink>
          <NavLink
            to="/"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            <div className="flex items-center">
              <img
                src={transaction}
                alt="transaction"
                className="mr-3 h-[18px] w-[18px]"
              />
              <span>Transactions</span>
            </div>
          </NavLink>
          <NavLink
            to="/"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            <div className="flex items-center">
              <img
                src={setting}
                alt="setting"
                className="mr-3 h-[18px] w-[18px]"
              />
              <span>Settings</span>
            </div>
          </NavLink>
          <NavLink
            to=""
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            <div className="flex items-center">
              <img
                src={logout}
                alt="logout"
                className="mr-3 h-[18px] w-[18px]"
              />
              <span onClick={handleSignOut}>Log out</span>
            </div>
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
