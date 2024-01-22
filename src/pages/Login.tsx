import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../asset/areocovert-logo.svg";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";
import { auth } from "../firebase/firebase";
import { LogIn } from "../utils/firebase/AuthFirestore";
import { StoreContext } from "../mobx stores/RootStore";

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.FormEvent) => {
    e.preventDefault();

    const element = e.target as HTMLInputElement;
    setUserDetails((prevDetails: any) => {
      return {
        ...prevDetails,
        [element.name]:
          element.name === "email"
            ? element.value.trim().toLowerCase()
            : element.value.trim(),
      };
    });
  };
  const navigate = useNavigate();

  const location: any = useLocation();

  const SignIn = async (e: any) => {
    e.preventDefault();
    setLoading(true);
      try {
        const res = await LogIn(userDetails);

        if (res.error === false) {
          // authStore.set
          setLoading(false);
          setTimeout(() => setLoading(true), 800);
          toast.success("Login Successful!");
          setTimeout(() => {
            if (!auth.currentUser?.emailVerified) {
              toast.dismiss();
              navigate("/dashboard");
              // navigate("/email_verification");
            } else {
              if (location?.state?.from?.pathname?.length > 0) {
                toast.dismiss();
                navigate(location?.state?.from?.pathname, { state: null });
              } else {
                toast.dismiss();
                // get profile details

                //get wallet details
                navigate("/dashboard");
              }
            }
            setLoading(false);
          }, 3000);
        } else {
          setLoading(false);
         
          if (res.data.message === "Firebase: Error (auth/user-not-found).") {
            toast.error("User not found", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              pauseOnFocusLoss: false,
            });
          } else if (res.data.message === "Firebase: Error (auth/invalid-credential).") {
            toast.error("Login credentials are invalid.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              pauseOnFocusLoss: false,
            });
          } else if (
            res.data.message === "Firebase: Error (auth/wrong-password)."
          ) {
            toast.error("Invalid password", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              pauseOnFocusLoss: false,
            });
          } else if (
            res.data.message === "Firebase: Error (auth/invalid-email)."
          ) {
            toast.error("Invalid email", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              pauseOnFocusLoss: false,
            });
          } else if (
            res.data.message ===
            "Firebase: Error (auth/network-request-failed)."
          ) {
            toast.error(
              "Network Request Failed. Please check your network connection",
              {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                pauseOnFocusLoss: false,
              }
            );
          } else if (
            res.data.message ===
            "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
          ) {
            toast.error(
              "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
              {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                pauseOnFocusLoss: false,
              }
            );
          } else {
            toast.error(
              "We are unable to process your form submission at this time. Please try again later!",
              {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                pauseOnFocusLoss: false,
              }
            );
          }
        }
      } catch (err) {}
    // }
  };

  return (
    <>

    <div className="bg-[#F5F5F5] w-[100%] h-screen flex flex-col items-center justify-center">
    {loading && <Spinner />}
    <Link to="/">
    <img src={logo} alt="logo" className="w-[216px] h-[53px] mb-6" />
    </Link>
      <div className="w-[100%] h-auto bg-[#FFF] flex flex-col items-center justify-center gap-10 pb-[30px] pt-[10px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-[#000] font-mont text-2xl font-bold">
            Welcome back
          </h1>
          <p className="font-mont text-[#000] font-medium text-lg">
            Please enter your login details below
          </p>
          
          <form className="flex flex-col gap-5" onSubmit={SignIn}>
            <div className="flex flex-col gap-2 w-[100%]">
              <label className="text-lg font-medium text-[#000] font-mont">
                Email <span className="text-[#FF4B00]">*</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className=" h-[60px] px-3 py-2 border-blue-400 border-2 rounded"
                value={userDetails.email.trim()}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <label className="text-lg font-medium text-[#000] font-mont">
                Password <span className="text-[#FF4B00]">*</span>
              </label>
              <input
                id="password"
                name="password"
                className=" h-[60px] px-3 py-2 border-blue-400 border-2 rounded  "
                value={userDetails.password.trim()}
                type={showPassword ? "text" : "password"}
                onChange={handleInputChange}
                autoComplete="false"
              />

              <span
                className="ml-[290px] -mt-[40px]"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon
                  path={showPassword ? mdiEyeOff : mdiEye}
                  vertical
                  size={1}
                />
              </span>
            </div>
            <p className="text-[#054B98] font-mont font-normal text-lg ">
              Forgot password?
            </p>
            <button className="bg-[#054B98]  h-[60px] text-[#FFF] font-mont font-bold text-2xl">
              LOGIN
            </button>
          </form>
        </div>
        <div className="flex gap-2">
          <p className="text-[#000] text-lg font-mont font-normal">
            Need an account?
          </p>
          <button
            onClick={() => {
              window.location.href = "/register";
            }}
            className="text-[#054B98] text-lg font-mont font-normal"
          >
            Sign up
          </button>
        </div>
        <p className="font-mont text-[#000] font-normal text-sm sm:text-base p-1 sm:p-2">
        This site is protected by reCAPTCHA and the Google
      </p>
      </div>
    </div>
    </>
  );
};

export default Login;
