

import React from "react";
import logo from "../asset/areocovert-logo.svg";
import instagram from "../asset/INSTAGRAM.png";
import linkedin from "../asset/LINKEDIN.png";
import facebook from "../asset/facebook.png";
import x from "../asset/x.png";

const Footer = () => {
  return (
    <div className="bg-[#EBEBEB] mt-[250px] flex flex-col px-[10px] pt-[50px] pb-[71px] justify-center items-center w-full">
      <div className="w-[90%] flex flex-col justify-center items-center">
        <div className="sm:flex flex-row justify-between  w-full ">
          <div className="flex flex-col gap-2">
            <img
              src={logo}
              alt="logo"
              className="mb-[10px] w-[248px] h-[62px]"
            />
            <p className="font-mont font-bold text-xl leading-7">Address</p>
            <p className="font-mont font-medium text-xl text-[#4E4B66]">
              Maryland, Ikeja, Lagos
            </p>
            <p className="text-[#054B99] font-normal font-mont text-xl">
              info@aeroconvert.com
            </p>
          </div>
          <div className="flex flex-row  pt-[7px]">
            <img src={linkedin} alt="linkedin" className="w-[48px] h-[48px]" />
            <img
              src={instagram}
              alt="instagram"
              className="w-[48px] h-[48px]"
            />
            <img src={facebook} alt="facebook" className="w-[48px] h-[48px]" />
            <img src={x} alt="x" className="w-[48px] h-[48px]" />
          </div>
          <div className="flex flex-col gap-4 pt-[30px]">
            <h1 className="font-mont font-bold text-xl text-[#14142B]">
              QUICK LINK
            </h1>
            <p className="font-mont text-xl font-medium text-[#4E4B66]">
              About us
            </p>
            <p className="font-mont text-xl font-medium text-[#4E4B66]">
              Service
            </p>
            <p className="font-mont text-xl font-medium text-[#4E4B66]">
              Exchange
            </p>
          </div>
          <div className="flex flex-col gap-4 pt-[30px]">
            <h1 className="font-mont font-bold text-xl text-[#14142B]">
              SUPPORT
            </h1>
            <p className="font-mont text-xl font-medium text-[#4E4B66]">Blog</p>
            <p className="font-mont text-xl font-medium text-[#4E4B66]">
              Community
            </p>
            <p className="font-mont text-xl font-medium text-[#4E4B66]">FAQ</p>
            <p className="font-mont text-xl font-medium text-[#4E4B66]">
              Contact Us
            </p>
          </div>
        </div>
        <div className="sm:flex flex-row w-full justify-center items-center pt-[30px]">
          <p className="mt-[2%] font-[mont] font-normal text-[#6E7191] text-lg ">
            All personal Data & Information are confidential and protected in
            line with NDPB data privacy.
          </p>
        </div>
        <div className="sm:flex flex-row gap-8 mt-[4%] w-full pt-5  justify-center items-center">
          <p className="font-mont font-medium text-[#4E4B66] text-xl">
            Terms & Conditions
          </p>
          <p className="font-mont font-medium text-[#4E4B66] text-xl">
            Privacy policy
          </p>
          <p className="font-mont font-medium text-[#4E4B66] text-xl">
            Cookies
          </p>
        </div>
        <div className="sm:flex flex-row gap-8 mt-[0%] w-full pt-5 justify-center items-center">
          <p className=" font-mont font-normal text-[#6E7191] text-lg w-full pt-5 text-center">
            @2024 All rights reserved. Airconvert
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
