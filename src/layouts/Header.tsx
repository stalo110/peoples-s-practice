import React, { useContext, useEffect, useState } from "react";
import notify from "../asset/notify.png";
import EmpytUser from "../asset/empty_user.png";
import { StoreContext } from "../mobx stores/RootStore";
import { toJS } from "mobx";

const Header = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const { profileStore } = useContext(StoreContext);
  const { profile } = profileStore;
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (profile) {
      setUsername(toJS(profile?.data)?.firstName);
    }
  }, [profile]);

  return (
    <header className="bg-[#EBEBEB] md:p-10 flex items-center justify-end h-[150px]">
      <div className="flex items-center md:mr-20">
        <div className="flex items-center">
          <img src={notify} alt="notify" className="mr-3 h-[40px] w-[40px]" />
        </div>
        <div className="flex items-center mr-3">
          <span className="text-lg text-[24px] text-[#054B98] font-[700]">
            {username && `Welcome, ${username}!`}
          </span>
        </div>
        <div className="flex items-center">
          <img
            src={EmpytUser}
            alt="EmpytUser"
            className="mr-3 h-[63px] w-[63px]"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
