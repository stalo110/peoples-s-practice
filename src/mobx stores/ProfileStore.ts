import axios from "axios";
import { configure, makeAutoObservable, runInAction } from "mobx";
import BaseDirectories from "../base directories/BaseDirectories";
configure({ enforceActions: "always" });


type Profile = {
  [key: string]: any;
};

export class ProfileStore {
  loadingData = true;
  submitting = false;
  error = "";
  success = "";
  userId = "";
  profile: Profile = {};
  token: any = sessionStorage.getItem("accessToken") || "";
  message = {
    type: "",
    msg: "",
  };

  private userProfile!: Profile;
  constructor() {
    makeAutoObservable(this);
    runInAction(() => {
      //   this.logger = new BrowserLogger(this.constructor.name);
      this.userProfile = JSON.parse(
        sessionStorage.getItem("user") || "{}"
      ) as Profile;
    });
  }

  getProfile() {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    this.setLoading(true);
    axios
      .get(`${BaseDirectories.API_BASE_URL}/users/get-profile`, {
        headers,
      })
      .then((res: any) => {
        this.setProfile(res.data);
        this.setToLocalStorage("user", res.data);
        runInAction(() => (this.userId = res.data._id));
        if (res) {
          this.setToLocalStorage("isRegistered", true);
        }
      })
      .catch((err) => {})
      .finally(() => {
        this.setLoading(false);
      });
  }

  setMessage = (type: string, msg: string) => {
    this.message.type = type;
    this.message.msg = msg;
  };

  setSubmitting = (val: boolean) => {
    this.submitting = val;
  };

  setLoading = (val: boolean) => {
    this.loadingData = val;
  };
  setProfile = (res: any) => {
    this.profile = res;

    // this.logger.info(`User | Get Profile | ${res.email}`, res);
  };

  setError = (err: string) => {
    this.error = err;
  };

  setSuccess = (msg: string) => {
    this.success = msg;
    // this.success_setting = msg;
  };

  setToLocalStorage = (key: string, value: any) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };

  SetAccessToken = (token: string) => {
    this.token = token || sessionStorage.getItem("accessToken");
  };
}
