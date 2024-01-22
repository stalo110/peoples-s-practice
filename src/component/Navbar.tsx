import React, { useEffect, useState } from "react";
import logo from "../asset/areocovert-logo.svg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";
import { LogOut } from "../utils/firebase/AuthFirestore";
import { observer } from "mobx-react-lite";
import { auth } from "../firebase/firebase";
 
const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    setCurrentUser(window.sessionStorage.getItem("user") as string);
  }, [auth.currentUser]);
 
  const handleSignOut = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await LogOut();
    if (res.error === false) {
      setTimeout(() => setLoading(false), 1000);
      toast.success("Logout Successful!");
    } else {
      setLoading(false);
      toast.error("Logout Failed!");
    }
  };
 
  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };
 
  return (
    <div className="bg-[#fff] flex justify-between items-center fixed top-0 left-0 w-full z-10 px-6 md:px-10 lg:px-16 xl:px-24 h-[104px]">
      {loading && <Spinner />}
 
      <div className="">
        <img src={logo} alt="logo" />
      </div>
 
      {/* Desktop Navigation */}
      <div className="sm:block">
      <div className="hidden desktop:flex items-center justify-between gap-[40px] w-[40%]">
          <a className="text-[#054B98] font-mont text-base font-semibold normal-case">
            Home
          </a>
          <a className="text-[#054B98] font-mont text-base font-semibold normal-case">
            About
          </a>
          <a className="text-[#054B98] font-mont text-base font-semibold normal-case">
            Service
          </a>
          <a className="text-[#054B98] font-mont text-base font-semibold normal-case">
            Contact
          </a>
          </div>
    
      </div>
 
      {/* Mobile Navigation */}
      <div className="sm:block">
      <div className="hidden desktop:flex items-center justify-between gap-[20px] w-[100%] gap-7">
        <button
          className="text-[#054B98] font-mont text-base font-semibold normal-case"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Login
        </button>
        <button
          className="bg-[#FFB01D] font-mont text-[#000] px-4 py-2 rounded-full text-lg font-bold leading-normal capitalize w-[100%] h-[50px]"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Sign Up
        </button>
      </div>
      </div>
 
      {/* Mobile Menu Toggle */}
      <div className="cursor-pointer md:hidden" onClick={toggleNavVisibility}>
        {isNavVisible ? (
          <span>&#10005;</span> // X icon
        ) : (
          <span>&#9776;</span> // Bar icon
        )}
      </div>
 
      {/* Mobile Navigation Items */}
      <div className={`md:hidden ${isNavVisible ? "block" : "hidden"} fixed top-[104px] left-0 w-full bg-[#fff] px-6 py-4`}>
        <ul className="flex flex-col gap-4">
          <li className="text-[#054B98] font-mont text-base font-semibold normal-case">
            Home
          </li>
          <li className="text-[#054B98] font-mont text-base font-semibold normal-case">
            About
          </li>
          <li className="text-[#054B98] font-mont text-base font-semibold normal-case">
            Service
          </li>
          <li className="text-[#054B98] font-mont text-base font-semibold normal-case">
            Contact
          </li>
          <li
            className="text-[#054B98] font-mont text-base font-semibold normal-case"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </li>
          <button
          className="bg-[#FFB01D] font-mont text-[#000] px-4 py-2 rounded-full text-lg font-bold leading-normal capitalize w-[50%] h-[50px]"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Sign Up
        </button>
        </ul>
      </div>
    </div>
  );
};
 
export default observer(Navbar);