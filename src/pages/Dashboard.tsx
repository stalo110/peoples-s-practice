import { useContext, useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import Card from "../layouts/Card";
import { StoreContext } from "../mobx stores/RootStore";
import Spinner from "../component/Spinner";
import { observer } from "mobx-react-lite";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { walletStore } = useContext(StoreContext);
  const [token, setToken] = useState(sessionStorage.getItem("accessToken"));
  const { loadingWallet } = walletStore;

  useEffect(() => {
    if (token) {
      walletStore.getWallet();
      walletStore.getCurrency();
    } else {
      setToken(sessionStorage.getItem("accessToken"));
    }
  }, [walletStore, token]);


  const onToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen bg-[#D9DBE9]">
      {loadingWallet && <Spinner />}
      <div className="">
        {/* <!-- Sidebar --> */}
        <Sidebar show={showSidebar} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <!-- Header --> */}
        <Header onToggleSidebar={onToggleSidebar} />
        {/* Body */}
        <Card />
      </div>
    </div>
  );
};

export default observer(Dashboard);
