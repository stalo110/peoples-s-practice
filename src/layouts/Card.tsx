/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import naira from "../asset/naira.png";
import us from "../asset/usa.png";
import euro from "../asset/eur.png";
import cana from "../asset/cad.png";
import uk from "../asset/uk.png";
import aud from "../asset/aud.png";
import jpy from "../asset/jpy.png";
import inr from "../asset/inr.png";
import { toJS } from "mobx";
import { StoreContext } from "../mobx stores/RootStore";
import { Button, Modal } from "flowbite-react";

const countries = [
  { code: "USD", name: " - US Dollar", flag: us },
  { code: "NGN", name: " - Nigerian Naira", flag: naira },
  { code: "EUR", name: " - Euro", flag: euro },
  { code: "GBP", name: " - Bristish Pound", flag: uk },
  { code: "CAD", name: " - Canadian Dollar", flag: cana },
  { code: "AUD", name: " - Australian Dollar", flag: aud },
  { code: "JPY", name: " - Japanese Yen", flag: jpy },
  { code: "INR", name: " - Indian Rupee", flag: inr },
];

const Card: React.FC = () => {
  const [toCountry, setToCountry] = useState(countries[1].code);
  const [currency, setCurrency] = useState([
    { code: "USD", buy: 0, sell: 0 },
    { code: "NGN", buy: 1, sell: 1 },
    { code: "EUR", buy: 0, sell: 0 },
    { code: "GBP", buy: 0, sell: 0 },
    { code: "CAD", buy: 0, sell: 0 },
    { code: "AUD", buy: 0, sell: 0 },
  ]);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const toggleToDropdown = () => {
    setShowToDropdown(!showToDropdown);
  };
  const { walletStore } = useContext(StoreContext);
  const { wallet, loadingWallet, currencyData, walletAccountDetails } =
    walletStore;

  useEffect(() => {
    const data: any = toJS(currencyData)[0];
    if (data != undefined || data != null) {
      setCurrency([
        { code: "USD", buy: data["USD"][0]?.buy, sell: data["USD"][0]?.buy },
        { code: "NGN", buy: 1, sell: 1 },
        { code: "EUR", buy: data["EUR"][0]?.buy, sell: data["EUR"][0]?.buy },
        { code: "GBP", buy: data["GBP"][0]?.buy, sell: data["GBP"][0]?.buy },
        { code: "CAD", buy: data["CAD"][0]?.buy, sell: data["CAD"][0]?.buy },
        { code: "AUD", buy: 0, sell: 0 },
      ]);
    }
  }, [walletStore, wallet, currencyData]);

  const bankTransferDetails = {
    bank: "Providus",
    accountName:
      toJS(walletAccountDetails)?.firstName != undefined
        ? toJS(walletAccountDetails)?.firstName +
          " " +
          toJS(walletAccountDetails)?.lastName
        : "NIL",
    accountNumber:
      toJS(wallet)?.walletIdAccountNumber != undefined
        ? toJS(wallet)?.walletIdAccountNumber
        : "NIL",
    accountType:
      wallet?.type && toJS(wallet)?.type != "Personal"
        ? "Coporate Account"
        : "Individual Account",
  };
  return (
    <div className="md:px-20 sm:ml-64 bg-[#D9DBE9] flex-1 overflow-x-hidden overflow-y-auto">
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="sm">
        <Modal.Header>Account Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="w-100 gap-2 mt-2">
              <div className="grid grid-cols-2 gap-6 mb-3">
                <div>
                  <h6>Bank</h6>
                </div>
                <div>
                  <p>{bankTransferDetails.bank}</p>
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-2 gap-6 mb-3">
                <div>
                  <h6>Account Name</h6>
                </div>
                <div>
                  <p style={{ textTransform: "capitalize" }}>
                    {bankTransferDetails.accountName}
                  </p>
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-2 gap-6 mb-3">
                <div>
                  <h6>Account Number</h6>
                </div>
                <div>
                  <p>{bankTransferDetails.accountNumber}</p>
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-2 gap-6 mb-3">
                <div>
                  <h6>Account Type</h6>
                </div>
                <div>
                  <p>{bankTransferDetails.accountType}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="red" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="p-1   rounded-lg dark:border-gray-700 ml-10 mt-14">
        {/* layer one */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center justify-center h-24 w-[189px] rounded bg-gray-50 dark:bg-gray-800">
            <div className="flex gap-3">
              <img
                src={naira}
                alt="ng"
                className="w-[70px] h-[70px] rounded-full"
              />
              <div className="flex flex-col ">
                <p className="text-[#000] font-mont text-lg font-medium">NGN</p>
                <p className="text-[#000] font-mont text-lg font-medium">
                  {!loadingWallet && toJS(wallet)?.availableBalance != undefined
                    ? wallet?.availableBalance !== "NaN" ||
                      wallet?.availableBalance !== null ||
                      wallet?.availableBalance !== undefined
                      ? new Intl.NumberFormat("en-US", {
                          style: "decimal",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(Number(toJS(wallet)?.availableBalance))
                      : "0.00"
                    : "0.00"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-24 w-[189px] rounded bg-gray-50 dark:bg-gray-800">
            <div className="flex gap-3">
              <img
                src={us}
                alt="ng"
                className="w-[70px] h-[70px] rounded-full"
              />
              <div className="flex flex-col ">
                <p className="text-[#000] font-mont text-lg font-medium">USD</p>
                <p className="text-[#000] font-mont text-lg font-medium">
                  {!loadingWallet && toJS(wallet)?.availableBalance != undefined
                    ? wallet?.availableBalance !== "NaN" ||
                      wallet?.availableBalance !== null ||
                      wallet?.availableBalance !== undefined
                      ? (
                          Number(toJS(wallet)?.availableBalance) /
                          Number(currency.find((d) => d.code === "USD")?.buy)
                        )?.toLocaleString()
                      : "0.00"
                    : "0.00"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-24 w-[189px] rounded bg-gray-50 dark:bg-gray-800">
            <div className="flex gap-3">
              <img
                src={euro}
                alt="ng"
                className="w-[70px] h-[70px] rounded-full"
              />
              <div className="flex flex-col ">
                <p className="text-[#000] font-mont text-lg font-medium">EUR</p>
                <p className="text-[#000] font-mont text-lg font-medium">
                  {!loadingWallet && toJS(wallet)?.availableBalance != undefined
                    ? wallet?.availableBalance !== "NaN" ||
                      wallet?.availableBalance !== null ||
                      wallet?.availableBalance !== undefined
                      ? (
                          Number(toJS(wallet)?.availableBalance) /
                          Number(currency.find((d) => d.code === "EUR")?.buy)
                        )?.toLocaleString()
                      : "0.00"
                    : "0.00"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-24 w-[189px] rounded bg-gray-50 dark:bg-gray-800 mr-[5.5%]">
            <div className="flex gap-3">
              <img
                src={cana}
                alt="ng"
                className="w-[70px] h-[70px] rounded-full"
              />
              <div className="flex flex-col ">
                <p className="text-[#000] font-mont text-lg font-medium">CAD</p>
                <p className="text-[#000] font-mont text-lg font-medium">
                  {!loadingWallet && toJS(wallet)?.availableBalance != undefined
                    ? wallet?.availableBalance !== "NaN" ||
                      wallet?.availableBalance !== null ||
                      wallet?.availableBalance !== undefined
                      ? (
                          Number(toJS(wallet)?.availableBalance) /
                          Number(currency.find((d) => d.code === "CAD")?.buy)
                        )?.toLocaleString()
                      : "0.00"
                    : "0.00"}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex flex-row-reverse items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="24"
              viewBox="0 0 14 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 23.332L13.3333 11.6654L0 -0.00130081L0 23.332Z"
                fill="#C48827"
              />
            </svg>
          </div>

          <div className="flex items-center justify-center w-[102px] h-[95px] rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-[#000] dark:text-gray-500">
              <svg
                className="w-[50px] h-[30px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
        </div>
        {/* layer two */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex gap-4">
            <button className="w-[189px] h-[56px] bg-[#054B98] text-[#FFF] font-mont text-lg font-bold">
              Make payment
            </button>
            <button
              className="w-[189px] h-[56px] bg-[#FFF] text-[#054B98] font-mont text-lg font-bold"
              onClick={() => setOpenModal(true)}
            >
              Add funds
            </button>
            <button className="w-[189px] h-[56px] bg-[#FFF] text-[#054B98] font-mont text-lg font-bold">
              Convert funds
            </button>
          </div>
          <div className="w-[605px] h-[376px] bg-[#FFF] flex flex-col pl-10 pt-4">
            <h1 className="text-2xl font-medium font-mont mb-4 text-[#000]">
              Exchange Rates
            </h1>
            <table className="table-auto w-[453px]">
              <thead>
                <tr>
                  <th className="border-b border-[#AFB6E5] p-2 text-left text-[#054B98] font-medium font-mont text-lg">
                    Currency
                  </th>
                  <th className="border-b border-[#AFB6E5] p-2 text-left text-[#054B98] font-medium font-mont text-lg">
                    Buying
                  </th>
                  <th className="border-b border-[#AFB6E5] p-2 text-left text-[#054B98] font-medium font-mont text-lg">
                    Selling
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className=" flex items-center gap-3 p-2 text-lg font-medium font-mont text-[#000]">
                    <img
                      src={us}
                      alt="ng"
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    USD
                  </td>
                  <td className=" p-2 text-lg text-[#000] font-mont font-medium">
                    N{" "}
                    {Number(currency.find((d) => d.code === "USD")?.buy) ??
                      "0.00"}
                  </td>
                  <td className=" p-2 text-lg text-[#000] font-mont font-medium">
                    N{" "}
                    {Number(currency.find((d) => d.code === "USD")?.sell) ??
                      "0.00"}
                  </td>
                </tr>
                <tr>
                  <td className=" flex items-center gap-3 p-2 text-lg font-medium font-mont text-[#000]">
                    <img
                      src={euro}
                      alt="ng"
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    EUR
                  </td>
                  <td className=" p-2 text-lg text-[#000] font-mont font-medium">
                    N{" "}
                    {Number(currency.find((d) => d.code === "EUR")?.buy) ??
                      "0.00"}
                  </td>
                  <td className=" p-2 text-lg text-[#000] font-mont font-medium">
                    N{" "}
                    {Number(currency.find((d) => d.code === "EUR")?.sell) ??
                      "0.00"}
                  </td>
                </tr>
                <tr>
                  <td className=" flex items-center gap-3 p-2 text-lg font-medium font-mont text-[#000]">
                    <img
                      src={cana}
                      alt="ng"
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    CAD
                  </td>
                  <td className=" p-2 text-lg text-[#000] font-mont font-medium">
                    N{" "}
                    {Number(currency.find((d) => d.code === "CAD")?.buy) ??
                      "0.00"}
                  </td>
                  <td className=" p-2 text-lg text-[#000] font-mont font-medium">
                    N{" "}
                    {Number(currency.find((d) => d.code === "CAD")?.sell) ??
                      "0.00"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-[395px] h-[450px] bg-[#054B98] flex flex-col  items-center mt-[-4.5rem]">
            <div className="flex">
              <button className="w-[198px] h-[56px] text-[#FFF] font-bold font-mont text-2xl">
                BUY
              </button>
              <button className="w-[198px] bg-[#FFF] h-[56px] text-[#000] font-bold font-mont text-2xl">
                SELL
              </button>
            </div>
            <div className="w-[318px] h-[274px] flex items-center gap-3 flex-col">
              <p className="mt-8 text-xs text-[#FFF] font-mont font-bold">
                Enter your destination country/currency:
              </p>
              <div className="relative">
                <div
                  onClick={toggleToDropdown}
                  className="cursor-pointer border p-2 rounded bg-[#FFF] flex items-center w-[317px]"
                >
                  <div className="flex  items-center w-full justify-between">
                    <div className="flex font-mont">
                      {countries.find((country) => country.code === toCountry)
                        ?.code || ""}
                      {countries.find((country) => country.code === toCountry)
                        ?.name || ""}
                      <img
                        className="ml-2 w-[36px] h-[24px]"
                        src={
                          countries.find(
                            (country) => country.code === toCountry
                          )?.flag || ""
                        }
                        alt={`${toCountry} flag`}
                      />
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="14"
                        viewBox="0 0 24 14"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 0L11.6667 13.3333L23.3333 0H0Z"
                          fill="#FFB01D"
                        />
                      </svg>
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

              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex gap-3 items-center">
                  <input type="number" className="w-[73px] h-[28px] rounded" />
                  <p className="font-bold text-[#FFF] font-mono text-lg leading-normal">
                    NGN
                  </p>
                </div>
                <p className="font-bold text-[#FFF] font-mono text-xs leading-normal">
                  {" "}
                  ={" "}
                </p>
                <div className="flex gap-3 items-center">
                  <input type="number" className="w-[73px] h-[28px] rounded" />
                  <p className="font-bold text-[#FFF] font-mono text-lg leading-normal">
                    USD
                  </p>
                </div>
              </div>
              <div className="w-[196px] flex flex-row justify-between mt-4 ">
                <p className="text-[#FFF] font-mont font-bold text-xs leading-normal">
                  1 NGN
                </p>
                <p className="text-[#FFF] font-mont font-bold text-xs leading-normal">
                  =
                </p>
                <p className="text-[#FFF] font-mont font-bold text-xs leading-normal">
                  0.0011 USD
                </p>
              </div>
              <button className="mt-10 rounded bg-[#C48827] w-[316px] h-[40px] text-[#FFF] font-mont font-bold text-2xl">
                BUY CASH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
