
import React, { useState } from "react";
import plane from "../asset/plane.png";
import usa from "../asset/usa.png";
import euro from "../asset/eur.png";
import uk from "../asset/uk.png";
import cad from "../asset/cad.png";
import aud from "../asset/aud.png";
import jpy from "../asset/jpy.png";
import inr from "../asset/inr.png";
import naira from "../asset/naira.png";
import vector from "../asset/Vector.png";
import plug from "../asset/plug.png";

const countries = [
  { code: "USD", name: " - US Dollar", flag: usa },
  { code: "NGN", name: " - Nigerian Naira", flag: naira },
  { code: "EUR", name: " - Euro", flag: euro },
  { code: "GBP", name: " - Bristish Pound", flag: uk },
  { code: "CAD", name: " - Canadian Dollar", flag: cad },
  { code: "AUD", name: " - Australian Dollar", flag: aud },
  { code: "JPY", name: " - Japanese Yen", flag: jpy },
  { code: "INR", name: " - Indian Rupee", flag: inr },
];

const Hero = () => {
  const [amount, setAmount] = useState("");
  const [fromCountry, setFromCountry] = useState(countries[0].code);
  const [toCountry, setToCountry] = useState(countries[1].code);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // const handleAmountChange = (e:any) => {
  //     setAmount(e.target.value);
  //   };

  //   const handleFromCountryChange = (e) => {
  //     setFromCountry(e.target.value);
  //   };

  //   const handleToCountryChange = (code) => {
  //       setToCountry(code);
  //       setShowToDropdown(false);
  //     };

  const toggleToDropdown = () => {
    setShowToDropdown(!showToDropdown);
  };
  return (
    <div className="bg-[#054B98] flex justify-center bg-cover bg-no-repeat bg-center relative z-0 w-full h-[987px]">
      <img src={plane} alt="" className="h-[987px]" />
      <div className="sm: absolute top-[290px] left-[5%] flex flex-col gap-3  w-[90%]  mb-auto" >
      <h1 className="sm:font-mont text-[#FDF9F9] font-extrabold text-5xl md:text-7xl leading-normal">
          A BETTER WAY TO FLY PRIVATE
        </h1>
        <div className="flex flex-row gap-3">
          <button className="bg-[#FFB01D] font-mont px-4 py-2 rounded-full w-[180px] h-[57px] font-bold text-lg">
            EXCHANGE
          </button>
          <button className="bg-[#FFF] font-mont px-4 py-2 rounded-full w-[180px] h-[57px] font-bold text-lg">
            READ MORE
          </button>
        </div>
      </div>

      <div className="absolute  bottom-[-15%]  rounded-lg w-[90%]  h-auto bg-white shadow-md flex flex-col justify-center items-center mt-[20px] ">
        <div className="flex flex-col gap-8 mb-[50px] h-auto w-[98%] mt-[20px]" >
        <div className="sm:flex flex-row justify-between  w-full ">

        <div className="sm:flex flex-col gap-8 mb-8  w-full mr-[1%] sm:w-30">
        <div className="w-full sm:w-100">
            <label className="block text-lg font-bold text-[#000] font-mont">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              placeholder="N 150,000"
              className="w-[100%] px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 "
            />
          </div>
          </div>
          <div className="sm:flex flex-col gap-8 mb-8  w-full sm:w-30 mr-[1%]">
        <div className="w-full sm:w-100">
            <label className="block text-lg font-bold text-[#000] font-mont" htmlFor="toCountry">
              From:
            </label>
            <div className="relative">
              <div
                onClick={toggleToDropdown}
                className="cursor-pointer border p-2 rounded flex items-center w-[100%]"
              >
                <div className="flex  items-center w-full justify-between">
                  <div className="flex font-mont ">
                    {countries.find((country) => country.code === toCountry)
                      ?.code || ""}
                    {countries.find((country) => country.code === toCountry)
                      ?.name || ""}
                    <img
                      className="ml-2 w-[36px] h-[24px]"
                      src={
                        countries.find((country) => country.code === toCountry)
                          ?.flag || ""
                      }
                      alt={`${toCountry} flag`}
                    />
                  </div>
                  <div>
                    <img src={vector} alt="vec" />
                  </div>
                </div>
              </div>
              {showToDropdown && (
                <div className="absolute top-full left-0 z-10 border rounded mt-1 bg-white w-[322px]">
                  {countries.map((country) => (
                    <div
                      key={country.code}
                      // onClick={() => handleToCountryChange(country.code)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100 w-[322px] flex justify-between"
                    >
                      <p className="font-mont text-[#000] text-sm font-normal">
                        {country.code} {country.name}
                      </p>

                      <img
                        className="ml-2 w-[36px] h-[24px]"
                        src={country.flag}
                        alt={`${country.code} flag`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          </div>
          <img src={plug} alt="plug" className="w-[79px] h-[79px] mr-[1%]" />
          <div className="sm:flex flex-col gap-8 mb-8  w-full sm:w-30">
        <div className="w-full sm:w-100">
            <label className="block text-lg font-bold text-[#000] font-mont" htmlFor="toCountry">
              To:
            </label>
            <div className="relative">
              <div
                onClick={toggleToDropdown}
                className="cursor-pointer border p-2 rounded flex items-center w-[100%]"
              >
                <div className="flex items-center w-full justify-between">
                  <div className="flex justify-between ">
                    <div className="font-mont">
                      {
                        countries.find((country) => country.code === "USD")
                          ?.code
                      }
                      {
                        countries.find(
                          (country) => country.name === " - US Dollar"
                        )?.name
                      }
                    </div>
                    <img
                      className="ml-2 w-[36px] h-[24px]"
                      src={
                        countries.find((country) => country.code === "USD")
                          ?.flag
                      }
                      alt={`${toCountry} flag`}
                    />
                  </div>
                  <div>
                    <img src={vector} alt="vec" />
                  </div>
                </div>
              </div>
              {showToDropdown && (
                <div className="absolute top-full left-0 z-10 border rounded mt-1 bg-white w-[322px]">
                  {countries.map((country) => (
                    <div
                      key={country.code}
                      // onClick={() => handleToCountryChange(country.code)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100 w-[322px] flex justify-between"
                    >
                      <p className="font-mont text-[#000] text-sm font-normal">
                        {country.code} {country.name}
                      </p>

                      <img
                        className="ml-2 w-[36px] h-[24px]"
                        src={country.flag}
                        alt={`${country.code} flag`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] flex justify-end">

        <button className="flex justify center align center mr-[20%] desktop: rounded-3xl bg-[#054B98] p-[40px] py-[14px] text-[#FFF] font-mont">
          Convert
        </button>
        </div>
        </div>
        </div>
      </div>
  );
};

export default Hero;