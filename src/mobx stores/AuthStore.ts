/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  applyActionCode,
} from "firebase/auth";
import { configure, makeAutoObservable, runInAction } from "mobx";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import axios from "axios";
import BaseDirectories from "../base directories/BaseDirectories";

configure({ enforceActions: "always" });

export class AuthStore {
  authenticated = false;
  loading = false;
  submitting = false;
  error = "";
  success = "";
  verified = false;
  token: any = sessionStorage.getItem("accessToken") || "";
  userId = "";
  user: any = auth.currentUser;
  message = {
    type: "",
    msg: "",
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  isAuthenticated() {
    return this.authenticated;
  }

  isVerified() {
    return this.isVerified;
  }

  async CreateUser(details: any) {
    this.setLoading(true);
    this.setSubmitting(true);

    try {
      const res: any = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      if (res.user) {
        // this.logger.info(`User | Sign Up | ${details.email}`, res);
        updateProfile(res.user, {
          displayName: details.firstName + " " + details.lastName,
        });
      }
      const actionCodeSettings = {
        url: `${BaseDirectories.BASE_URL}/dashboard/overview/?email=${auth.currentUser?.email}`,
        handleCodeInApp: true,
      };
      //create profile in backend
      const user: any = auth.currentUser;
      let token;
      if (user) {
        token = await user.getIdToken();
      }

      if (token) {
        this.SetAccessToken(token);
        await this.createProfile(details, res?.user, actionCodeSettings);
      }

      this.setSuccess(res);
      this.setLoading(false);
      this.setSubmitting(false);
      runInAction(() => {
        this.loading = false;
      });
    } catch (error: any) {
      this.setError(error);
      this.setLoading(false);
      this.setSubmitting(false);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async sendVerificationMail(user: any, actionCodeSettings: any) {
    await sendEmailVerification(user, actionCodeSettings)
      .then((res: any) => {
        // return;
      })
      .catch((error: any) => {
        // return;
      });
  }

  async deleteUser() {
    const user: any = auth.currentUser;
    user
      .delete()
      .then(() => {
        return;
      })
      .catch((error: any) => {
        return;
      });
  }

  async VerifyEmail(actionCode: any) {
    this.setLoading(true);
    try {
      await applyActionCode(auth, actionCode)
        .then(() => {
          toast.success("Email verified successfully.");
          this.setMessage("success", "Email verified successfully.");
          return;
        })

        .catch((error) => {
          toast.error(this.mapAuthCodeToMessage(error.code));
          this.setMessage("error", this.mapAuthCodeToMessage(error.code));
          return;
        });

      runInAction(() => {
        this.loading = false;
      });
    } catch (error: any) {
      this.setError(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async createProfile(data: any, resUser: any, actionCodeSettings: any) {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
    this.setSubmitting(true);
    axios
      .post(`${BaseDirectories.API_BASE_URL}/users/create-profile`, data, {
        headers,
      })
      .then(async (res: any) => {
        if (!res.data.error) {
          toast.success("Profile created successfully", { autoClose: 2000 });
          await this.sendVerificationMail(resUser, actionCodeSettings);
          this.setMessage("success", "Profile created successfully");
          this.setToLocalStorage("user", res.data);
          setTimeout(() => {
            this.setMessage("", "");
          }, 3000);
        } else {
          await this.deleteUser();
          toast.error(`${res.data.message}`);
        }
        this.setSubmitting(false);
      })
      .catch(async (err) => {
        await this.deleteUser();
        toast.error(
          `${err.response.data.message}, ${err.response.data.statusCode}`
        );
        this.setMessage("error", err.response.data.message);
        setTimeout(() => {
          this.setMessage("", "");
        }, 4000);
        this.setSubmitting(false);
      });
  }

  mapAuthCodeToMessage = (authCode: string) => {
    switch (authCode) {
      case "auth/invalid-password":
        return "Current password provided is not correct.";

      case "auth/wrong-password":
        return "Current password provided is not correct.";

      case "auth/too-many-requests":
        return "Too many tries, please try again later.";

      default:
        return "Something went wrong, please try again later.";
    }
  };

  setError = (err: string) => {
    this.error = err;
  };
  setSuccess = (res: string) => {
    this.success = res;
  };

  setMessage = (type: string, msg: string) => {
    this.message.type = type;
    this.message.msg = msg;
  };

  setSubmitting = (val: boolean) => {
    this.submitting = val;
  };

  setUserNotAuthenticated() {
    this.authenticated = false;
    this.token = "";
    this.error = "Sign up failed";
    this.setLoading(false);
    this.clearFromLocalStorage();
  }

  setUser = (res: any) => {
    this.user = res;
  };

  setLoading = (val: boolean) => {
    this.loading = val;
  };

  SetAccessToken = (token: string) => {
    this.token = token || sessionStorage.getItem("accessToken");
  };

  setToLocalStorage = (key: string, value: any) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };

  clearFromLocalStorage = () => {
    window.sessionStorage.clear();
  };

  setUserAuthenticated(res: any) {
    this.authenticated = true;
    this.token = res.access_token;
    this.success = "Sign up successful";
    this.setLoading(false);
    this.setToLocalStorage("accessToken", this.token);
    this.setToLocalStorage("uid", this.userId);
  }
}
