import React, { useState, FC, useContext } from "react";
import logo from "../asset/areocovert-logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from "mobx-react-lite";
import { StoreContext } from "../mobx stores/RootStore";
import { useNavigate } from "react-router";
import { runInAction } from "mobx";
import { Link } from "react-router-dom";
import Spinner from "../component/Spinner";
import { toast } from "react-toastify";

const Register: FC = observer(() => {
  const [formType, setFormType] = useState("personal");

  const toggleForm = (type: string) => {
    setFormType(type);
  };

  return (
    <div className="bg-[#F5F5F5] h-auto flex flex-col items-center justify-center ">
      <div className="w-[90%] h-auto bg-[#FFF] flex flex-col items-center pb-[30px] ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[216px] h-[53px]  my-4 " />
        </Link>
        <div className="flex flex-col gap-2 mb-4 items-center">
          <h1 className="font-mont text-[#000] text-2xl font-bold">
            Create your account
          </h1>
          <p className="font-mont text-[#000] font-normal text-base">
            Please provide your credentials below
          </p>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => toggleForm("personal")}
            style={{ color: formType === "personal" ? "#054B98" : "#FFB01D" }}
            className="text-2xl font-mont font-medium"
          >
            Personal
          </button>
          <button
            onClick={() => toggleForm("corporate")}
            style={{ color: formType === "corporate" ? "#054B98" : "#FFB01D" }}
            className="text-2xl font-mont font-medium"
          >
            Corporate
          </button>
        </div>
        {formType === "personal" && <PersonalForm />}
        {formType === "corporate" && <CorporateForm />}
        <div className="flex flex-row gap-2">
          <p className="font-mont font-normal text-lg text-[#000]">
            Already have an account?
          </p>
          <button
            className="font-mont font-normal text-lg text-[#054B98]"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
});

const PersonalForm = observer(() => {
  const [showPassword, setShowPassword] = useState(false);
  const { authStore } = useContext(StoreContext);
  const recaptchaRef: any = React.useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const recaptchaValue = recaptchaRef.current?.getValue();
  if (recaptchaRef.current) {
    recaptchaRef.current.reset();
  }
  const handleCaptchachange = () => {
    return;
  };
  const { loading } = authStore;
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    rcNumber: "",
    accountType: "",
    bvn: "string",
    nin: "",
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
            : element.value,
      };
    });
  };

  const navigate = useNavigate();

  const personalSignUp = (e: any) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const recaptchaValue = recaptchaRef.current?.getValue();
    recaptchaRef.current.reset();

    userDetails.accountType = "individual";

    authStore.CreateUser(userDetails);

    runInAction(() => {
      authStore.setSuccess = () => {
        // navigate("/email_verification");
        navigate("/login");
      };
    });

    runInAction(() => {
      authStore.setError = (error: any) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast.error(
            "Email already in use. Please use a different email then try again!"
          );
        }
        if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          toast.error("Password should be at least 6 characters");
        }

        if (error.message === "Firebase: Error (auth/invalid-email).") {
          toast.error(
            "Invalid email. Please use a valid email then try again!"
          );
        }
        if (error.message === "Firebase: Error (auth/weak-password).") {
          toast.error("Weak password.");
        } else {
          toast.error(
            "We are unable to process your form submission at this time. Please try again later!"
          );
        }
      };
    });
  };

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={personalSignUp} className="flex flex-col gap-5">
    
        <div className="flex flex-col gap-2  w-[90%] ml-[5%]">
          <label className="text-base font-normal text-[#000] font-mont">
            First name <span className="text-[#FF4B00]">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            className="input-control w-[100%]"
            value={userDetails.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2  w-[90%] ml-[5%]">
          <label className="text-base font-normal text-[#000] font-mont">
            Last name <span className="text-[#FF4B00]">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            className="input-control w-[100%]"
            value={userDetails.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2  w-[90%] ml-[5%]">
          <label className="text-base font-normal text-[#000] font-mont">
            Email <span className="text-[#FF4B00]">*</span>
          </label>
          <input
            type="text"
            name="email"
            className="input-control w-[100%]"
            value={userDetails.email.trim().toLowerCase()}
            onChange={handleInputChange}
            required
          />
          <div>
            <label className="text-base font-normal text-[#000] font-mont">
              Phone Number <span className="text-[#FF4B00]">*</span>
            </label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="NG"
              onChange={(e: string) =>
                setUserDetails((prevDetails: any) => {
                  return { ...prevDetails, phone: e };
                })
              }
              className="input-phone w-[100%]"
              id="phone"
              value={userDetails.phone}
              rules={{ required: true }}
            />
          </div>
          <div className="flex flex-col gap-2  w-[100%] ">
            <label className="text-base font-normal text-[#000] font-mont">
              Password <span className="text-[#FF4B00]">*</span>
            </label>
            <input
              id="password"
              name="password"
              className="input-control w-[100%]"
              value={userDetails.password.trim()}
              type={showPassword ? "text" : "password"}
              onChange={handleInputChange}
              required
            />
            <span
              className="ml-[90%] -mt-[40px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon
                path={showPassword ? mdiEyeOff : mdiEye}
                vertical
                size={1}
              />
            </span>
          </div>
          <div className="mb-3 my-2 ">
            <input
              name="checkbox"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              required
            />
            <label className="pl-2" htmlFor="flexCheckDefault">
              I agree with the{" "}
              <a
                href="https://docs.google.com/document/d/1Gg-uvbCqS0dPo2lZSh1zDnteQphVVAeR/edit?usp=sharing&ouid=106690636404743294862&rtpof=true&sd=true"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#054b99" }}
              >
                Terms and Conditions
              </a>{" "}
              of Aeroconvert
            </label>
          </div>
          <div className="w-full flex justify-center">
            <ReCAPTCHA
              sitekey={`${process.env.REACT_APP_CAPTCHA_SITE_KEY}`}
              className="mb-2 mt-0 "
              size="normal"
              ref={recaptchaRef}
              onClick={() => handleCaptchachange}
            />
          </div>
        </div>
      
        <div className="mb-3 my-2">
        <button className="btn-primary w-[100%]" type="submit">
          REGISTER NOW
        </button>
        </div>

      </form>
    </>
  );
});

const CorporateForm = observer(() => {
  const [showPassword, setShowPassword] = useState(false);
  const { authStore } = useContext(StoreContext);
  const recaptchaRef: any = React.useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const recaptchaValue = recaptchaRef.current?.getValue();
  if (recaptchaRef.current) {
    recaptchaRef.current.reset();
  }
  const handleCaptchachange = () => {
    return;
  };
  const { loading } = authStore;
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    rcNumber: "",
    accountType: "",
    bvn: "",
    nin: "",
    customId: "",
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
            : element.value,
      };
    });
  };

  const navigate = useNavigate();

  const coperateSignUp = (e: any) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const recaptchaValue = recaptchaRef.current?.getValue();
    recaptchaRef.current.reset();

    userDetails.accountType = "corporate";

    authStore.CreateUser(userDetails);

    runInAction(() => {
      authStore.setSuccess = () => {
        // navigate("/email_verification");
        navigate("/login");
      };
    });

    runInAction(() => {
      authStore.setError = (error: any) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast.error(
            "Email already in use. Please use a different email then try again!"
          );
        }
        if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          toast.error("Password should be at least 6 characters");
        }

        if (error.message === "Firebase: Error (auth/invalid-email).") {
          toast.error(
            "Invalid email. Please use a valid email then try again!"
          );
        }
        if (error.message === "Firebase: Error (auth/weak-password).") {
          toast.error("Weak password.");
        } else {
          toast.error(
            "We are unable to process your form submission at this time. Please try again later!"
          );
        }
      };
    });
  };

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={coperateSignUp}>
        <div className="flex flex-col gap-2  w-[90%] ml-[5%]">
          <label className="text-base font-normal text-[#000] font-mont">
            Business name
          </label>
          <input
            type="text"
            name="firstName"
            className="input-control"
            value={userDetails.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2  w-[90%] ml-[5%]">
          <label className="text-base font-normal text-[#000] font-mont">
            RC number
          </label>
          <input
            type="text"
            name="rcNumber"
            className="input-control"
            value={userDetails.rcNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2  w-[90%] ml-[5%]">
          <label className="text-base font-normal text-[#000] font-mont">
            Email <span className="text-[#FF4B00]">*</span>
          </label>
          <input
            type="text"
            name="email"
            className="input-control"
            value={userDetails.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="text-base font-normal text-[#000] font-mont">
            Phone Number <span className="text-[#FF4B00]">*</span>
          </label>
          <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="NG"
              onChange={(e: string) =>
                setUserDetails((prevDetails: any) => {
                  return { ...prevDetails, phone: e };
                })
              }
              className="input-phone"
              id="phone"
              value={userDetails.phone}
              rules={{ required: true }}
            />
        </div>
        <div className="flex flex-col gap-2  w-[90%] ml-[5%]">
          <label className="text-base font-normal text-[#000] font-mont">
            Password <span className="text-[#FF4B00]">*</span>
          </label>
          <input
              id="password"
              name="password"
              className="input-control w-[100%]"
              value={userDetails.password.trim()}
              type={showPassword ? "text" : "password"}
              onChange={handleInputChange}
              required
            />
          <span
            className="ml-[210px] -mt-[40px]"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon path={showPassword ? mdiEyeOff : mdiEye} vertical size={1} />
          </span>
        </div>
        <div className="mb-3 my-2 ">
          <input
            name="checkbox"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            required
          />
          <label className="pl-2" htmlFor="flexCheckDefault">
            I agree with the{" "}
            <a
              href="https://docs.google.com/document/d/1Gg-uvbCqS0dPo2lZSh1zDnteQphVVAeR/edit?usp=sharing&ouid=106690636404743294862&rtpof=true&sd=true"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#054b99" }}
            >
              Terms and Conditions
            </a>{" "}
            of Aeroconvert
          </label>
        </div>
        <div className="w-full flex justify-center">
          <ReCAPTCHA
            sitekey={`${process.env.REACT_APP_CAPTCHA_SITE_KEY}`}
            className=" mb-2 mt-3 "
            size="normal"
            ref={recaptchaRef}
            onClick={() => handleCaptchachange}
          />
        </div>
        <div className="mb-3 my-2 bg-[black]">
        <button className="btn-primary w-[100%]" type="submit">
          REGISTER NOW
        </button>
        </div>
      </form>
    </>
  );
});

export default Register;
