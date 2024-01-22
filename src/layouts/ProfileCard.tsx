import React, { useContext } from "react";
import { StoreContext } from "../mobx stores/RootStore";
import { toJS } from "mobx";

const ProfileCard = () => {

  const { walletStore } = useContext(StoreContext);
  const { wallet, loadingWallet } = walletStore;


  return (
    <div className="p-1 sm:ml-64 bg-[#D9DBE9] flex-1 overflow-x-hidden overflow-y-auto">
      <div className="p-1   rounded-lg dark:border-gray-700 ml-10 mt-14">
        <div className="flex mb-4 gap-9">
          <div className="w-[232px] h-[120px]">
            <h1 className="text-5xl text-[#054B98] font-bold font-mont">
              Make Payment
            </h1>
          </div>
          <div className="w-[347px] h-[120px] bg-[#FFF] rounded-2xl shadow-[0px_4px_40px_0px_rgba(0,0,0,0.25)] p-6">
            <h1 className="text-[#D9D9D9] font-mont font-bold text-lg">
              Balance
            </h1>
            <p className="text-[#000] text-3xl font-mont font-bold leading-10">
              N {!loadingWallet
                    ? wallet?.availableBalance !== "NaN" ||
                      wallet?.availableBalance !== null ||
                      wallet?.availableBalance !== undefined
                      ? new Intl.NumberFormat('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(Number(toJS(wallet)?.availableBalance)) 
                      : "0.00"
                    : "0.00"}
            </p>
          </div>
          <div className="w-[347px] h-[120px] bg-[#FFF] rounded-2xl shadow-[0px_4px_40px_0px_rgba(0,0,0,0.25)] p-6">
            <h1 className="text-[#D9D9D9] font-mont font-bold text-lg">
              Your Transfer
            </h1>
            <div className="flex gap-3">
              <p className="font-mont font-bold leading-10 text-[#000] text-3xl">
                20,000.00
              </p>
              <p className="font-mont font-bold leading-10 text-[#C48827] text-4xl">
                |
              </p>
              <p className="font-mont font-bold leading-10 text-[#000] text-3xl">
                NGN
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-[252px] h-[261px] bg-[#FFF]">
            <button className="w-[252px] h-[53px] text-left pl-2 bg-[#054B98] text-[#FFF] hover:bg-[#054B98] hover:text-[#FFF] font-mont font-bold text-lg">
              Pay a Jet Charter
            </button>
            <button className="w-[252px] h-[53px] text-left pl-2 hover:bg-[#054B98] hover:text-[#FFF] text-[#054B98] font-mont font-bold text-lg border-b-2 border-[#AFB6E5]">
              Buy a Jet
            </button>
            <button className="w-[252px] h-[53px] text-left pl-2 hover:bg-[#054B98] hover:text-[#FFF] text-[#054B98] font-mont font-bold text-lg border-b-2 border-[#AFB6E5]">
              Pay for Me
            </button>
            <button className="w-[252px] h-[53px] text-left pl-2 hover:bg-[#054B98] hover:text-[#FFF] text-[#054B98] font-mont font-bold text-lg border-b-2 border-[#AFB6E5]">
              Pay a Supplier
            </button>
            <button className="w-[252px] h-[53px] text-left pl-2 hover:bg-[#054B98] hover:text-[#FFF] text-[#054B98] font-mont font-bold text-lg">
              Pay a Supplier
            </button>
          </div>

          <div className="w-[347px] h-[341px] bg-[#FFF] p-4">
            <div className="mb-5 border-b-2 border-[#AFB6E5] w-full">
              <p className="font-bold font-mont text-[#054B98] text-lg">
                Jet Charter details
              </p>
            </div>
            <div className="flex flex-col">
              <label className="text-[#000] font-mont font-medium text-sm ">
                Pay a Jet Charter
              </label>
              <input type="text" className="h-[29px] w-[301px] rounded" />
            </div>
            <div className="flex flex-col">
              <label className="text-[#000] font-mont font-medium text-sm ">
                Account number
              </label>
              <input type="text" className="h-[29px] w-[301px] rounded" />
            </div>
            <div className="flex flex-col">
              <label>Amount</label>
              <input type="text" className="h-[29px] w-[301px] rounded" />
            </div>
            <div className="flex flex-col">
              <label className="text-[#000] font-mont font-medium text-sm ">
                Description
              </label>
              <input type="text" className="h-[78px] w-[301px] rounded" />
            </div>
          </div>
          <div className="w-[379px] h-[341px] bg-[#FFF]">
            <div className="mb-5 border-b-2 border-[#AFB6E5] w-full">
              <p className="font-bold font-mont text-[#054B98] text-lg pl-4 pt-4">
                Payment details
              </p>
            </div>
            <div className="p-5 flex flex-col jusifty-center items-center w-full">
              <div className="flex w-full justify-between">
                <p className="text-[#D9D9D9] font-mont font-bold text-sm">
                  Transfer ID
                </p>
                <p className="text-[#000] font-mont font-bold text-sm">
                  000000
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#D9D9D9] font-mont font-bold text-sm">
                  Status
                </p>
                <p className="text-[#000] font-mont font-bold text-sm">
                  Received
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#D9D9D9] font-mont font-bold text-sm">
                  Your transfer
                </p>
                <p className="text-[#000] font-mont font-bold text-sm">
                  {" "}
                  NGN 20,000.00
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#D9D9D9] font-mont font-bold text-sm">
                  {" "}
                  Transfer fee
                </p>
                <p className="text-[#000] font-mont font-bold text-sm"> Free</p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#D9D9D9] font-mont font-bold text-sm">
                  {" "}
                  Total amount
                </p>
                <p className="text-[#000] font-mont font-bold text-sm">
                  NGN 20,000.00
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#D9D9D9] font-mont font-bold text-sm">
                  Date
                </p>
                <p className="text-[#000] font-mont font-bold text-sm">
                  18.01.2024
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-[#D9D9D9] font-mont font-bold text-sm">
                  Time
                </p>
                <p className="text-[#000] font-mont font-bold text-sm">
                  0:00am
                </p>
              </div>
              <button className="w-[200px] h-[30px] bg-[#054B98] rounded-3xl mt-7 text-[#FFF] font-mont font-bold text-sm ">
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
