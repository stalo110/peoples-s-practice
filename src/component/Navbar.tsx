import { useState } from "react";
import logo from "../asset/areocovert-logo.svg";
import { observer } from "mobx-react-lite";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
 
const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

 
  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="bg-[#fff] flex justify-between items-center fixed top-0 left-0 w-full z-10 px-6 md:px-10 lg:px-16 xl:px-24 h-[104px]">
     
 
      <div className="">
        <img src={logo} alt="logo" />
      </div>
 
      {/* Desktop Navigation */}
      <div className="sm:block">
      <div className="hidden desktop:flex items-center justify-between gap-[40px] w-[40%]">
          <a href="/home" className="text-[#054B98] font-mont text-base font-semibold normal-case">
            Home
          </a>
          <a href="/about" className="text-[#054B98] font-mont text-base font-semibold normal-case">
            About
          </a>
          <a href="/services" className="text-[#054B98] font-mont text-base font-semibold normal-case">
            Service
          </a>
          <a href="/contact" className="text-[#054B98] font-mont text-base font-semibold normal-case">
            Contact
          </a>
          </div>
    
      </div>
 
      {/* Mobile Navigation */}
      <div className="sm:block">
      <div className="hidden desktop:flex items-center justify-between gap-[20px] w-[100%] gap-7">
        <Link  
        to="/login"
        className="bg-[#FFB01D] font-mont text-[#000] px-4 py-2 rounded-full text-lg font-bold leading-normal capitalize w-[100%] h-[50px]"
        >
          Login
        </Link>
        
        {/* <button
          href="/register"
          className="bg-[#FFB01D] font-mont text-[#000] px-4 py-2 rounded-full text-lg font-bold leading-normal capitalize w-[100%] h-[50px]"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Sign Up
        </button> */}
      </div>
      </div>
 
      {/* Mobile Menu Toggle */}
      <div className="cursor-pointer md:hidden" onClick={toggleNavVisibility}>
        {isNavVisible ? (

          <span>< AiOutlineClose/></span> // X icon
        ) : (
          <span>< FaBars/></span> // Bar icon
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