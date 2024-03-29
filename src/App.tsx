import  { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { SetAllAccessTokens, StoreContext } from "./mobx stores/RootStore";
import {
  auth,
  onAuthStateChangedListener,
} from "./firebase/firebase";
import PrivateRoute from "./component/PrivateRoute";

import { observer } from "mobx-react-lite";

function App() {
  const { profileStore, authStore } = useContext(StoreContext);


  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (res: any) => {
      if (res) {
        res?.getIdToken(true).then((idToken: string) => {
          window.sessionStorage.setItem("accessToken", idToken);
          SetAllAccessTokens(idToken);
          try {
            authStore.setUser(res);
            profileStore.getProfile();
            // walletStore.getWallet(); // to call when on dashboard and disable from here
          } catch (error) {
          } finally {
          }
        });
        if (res) {
          if (res.emailVerified) {
            window.sessionStorage.setItem("userStatus", "true");
            // setActiveUser(true);
          }
        } else {
          window.sessionStorage.setItem("userStatus", "false");
          // setActiveUser(false);
        }
        // return res ? setUser(res) : setUser(null);
      }
    });
    return unsubscribe;
  }, [authStore, profileStore]);

  useEffect(() => {
    const checkAndRenewToken = async () => {
      const userData: any = auth.currentUser;
      if (userData) {
        try {
          await userData.getIdToken(true).then((idToken: string) => {
            window.sessionStorage.setItem("accessToken", idToken);
            SetAllAccessTokens(idToken);
          });
          // console.debug('Token refreshed successfully.');
        } catch (err) {
          // console.debug('Error refreshing token:', err);
        }
      }
    };
    const intervalCheck = setInterval(checkAndRenewToken, 600000);

    return () => clearInterval(intervalCheck);
  }, []);

  return (
    <div className="">
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute activeUser={auth.currentUser} />}>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default observer(App);
