/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { configure, makeAutoObservable, runInAction, toJS } from "mobx";
import { toast } from "react-toastify";
import BaseDirectories from "../base directories/BaseDirectories";

configure({ enforceActions: "always" });

type Message = {
  type: string;
  msg: any;
};

type WalletDetails = {
  [key: string]: any;
};
type WalletAccountDetails = {
  [key: string]: any;
};

type Profile = {
  [key: string]: any;
};

type ObjectType = {
  [key: string]: any;
};

export class WalletStore {
  loadingData = false;
  loadingWallet = false;
  submitting = false;
  changing = false;
  showModal = false;
  resending = false;
  walletError: any = [];
  transactions: any = [];
  creditTransactions: any = [];
  debitTransactions: any = [];
  transaction = {};
  banks = [];
  currencyData = []
  wallet: WalletDetails = {};
  walletAccountDetails: WalletAccountDetails = {};
  bankReceiverFullName = "";
  walletReceiverFullName = "";
  token: any = sessionStorage.getItem("accessToken") || "";
  urlParams: any = "";
  message: Message = {
    type: "",
    msg: "",
  };
  error = {
    type: "error",
    msg: "",
  };
  success = {
    type: "success",
    msg: "",
  };

  private userProfile!: Profile;

  constructor() {
    makeAutoObservable(this);
  }

  getWallet() {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    this.setLoadingWallet(true);

    axios
      .get(`${BaseDirectories.API_BASE_URL}/wallet/get-wallet`, {
        headers,
      })
      .then((res: any) => {
        if (res.data.error) {
          this.setWalletError(res.data);
        } else {
          this.setWalletError(null);
        }
        this.setWallet(res.data?.data?.wallet);
        this.setWalletAccountDetails(res.data?.data?.accountDetails);
        this.setLoadingWallet(false);
      })
      .catch((err) => {
       this.setWalletError(err);
      })
      .finally(() => {
        setTimeout(() => {
          this.setLoadingWallet(false);
        }, 60000);
      });
    // }
  }

  getWalletWithoutLoading() {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
    const profile = window.sessionStorage.getItem("user");
    const itemObject = profile ? JSON.parse(profile) : null;
    if (
      window.sessionStorage.getItem("userStatus") === "true" &&
      itemObject?.title !== "User | Get Profile | undefined"
    ) {
      if (this.token) {
        axios
          .get(`${BaseDirectories.API_BASE_URL}/wallet/get-wallet`, {
            headers,
          })
          .then((res: any) => {
            if (res.data.error) {
              return;
            }
            this.setWallet(res.data?.data?.wallet);
            this.setWalletAccountDetails(res.data?.data?.accountDetails);
          })

          .catch((err) => {});
      }
    }
  }

  getAllTransactions() {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
    if (this.token) {
      this.setLoading(true);
      axios
        .get(`${BaseDirectories.API_BASE_URL}/wallet/all-transactions`, {
          headers,
        })
        .then((res: any) => {
          this.setLoading(false);
          this.setTransactions(res.data.transactions);
          this.transactions = res.data.transactions;
        })
        .catch((err) => {
          this.setLoading(false);
          this.setError("Error");
        });
    }
  }

  transferToBank(data: any) {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    this.setSubmitting(true);
    axios
      .post(`${BaseDirectories.API_BASE_URL}/wallet/NIP-transfer`, data, {
        headers,
      })
      .then((res: any) => {
        if (res.data.error) {
          toast.error(res.data.message);
          this.setMessage("error", "Transfer failed!");
        } else {
          toast.success(res.data.message);
          //   toast.success('Transfer successful!');
          this.getWalletWithoutLoading();
          this.setMessage("success", "Transfer successful!");
        }
        this.setSubmitting(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        this.setMessage("error", err.response.data.message);
        setTimeout(() => {
          this.setMessage("", "");
        }, 6000);
        this.setSubmitting(false);
      });
  }

  getNipBanks() {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
    this.setLoading(true);
    axios
      .get(
        `${BaseDirectories.API_BASE_URL}/wallet/get-all-NIP-banks
      `,
        { headers }
      )
      .then((res: any) => {
        console.log(res);
        this.setLoading(false);
        if (res.data?.name === "Error") {
          toast.error("unable to fetch banks");
          return;
        }
        this.setBanks(res.data);
        this.banks = res.data;
      })
      .catch((err) => {
        this.setLoading(false);
        this.setError("Error");
      });
  }

  verifyNipAccount(accountNumber: string, bankName: string) {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
    this.setLoading(true);
    axios
      .get(
        `${BaseDirectories.API_BASE_URL}/wallet/NIP-account-verification/${accountNumber}/?accountNumber=${accountNumber}&bankName=${bankName}`,
        { headers }
      )
      .then((res: any) => {
        this.setLoading(false);
        if (res.data?.error) {
          toast.error(res.data?.message || "Unable to verify account");
          return;
        }
        runInAction(() => {
          this.bankReceiverFullName = res.data;
        });
      })
      .catch((err) => {
        this.setLoading(false);
        this.setError("Error");
      });
  }

  getCurrency() {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`${BaseDirectories.API_BASE_URL}/currency-exchange`, {
        headers,
      })
      .then((res: any) => {
        this.setCurrency(res.data);
      })
      .catch((err) => {
      //  
      })
      .finally(() => {
        setTimeout(() => {
          this.setLoadingWallet(false);
        }, 60000);
      });
    // }
  }


  setCurrency = (res: any) => {
    this.currencyData = res;
  };
  
  setWalletAccountDetails = (res: any) => {
    this.walletAccountDetails = res;
  };
  setWallet = (res: any) => {
    this.wallet = res;
  };

  setBanks = (res: any) => {
    this.banks = res;
  };

  setTransactions = (res: any) => {
    this.transactions = res;
  };

  setCreditTransactions = (res: any) => {
    this.creditTransactions = res;
  };

  setDebitTransactions = (res: any) => {
    this.debitTransactions = res;
  };

  setTransaction = (res: any) => {
    this.transaction = res;
  };

  setLoading = (val: boolean) => {
    this.loadingData = val;
  };
  setLoadingWallet = (val: boolean) => {
    this.loadingWallet = val;
  };

  setWalletError = (val: any) => {
    this.walletError = val;
  };

  setSubmitting = (val: boolean) => {
    this.submitting = val;
  };

  setResending = (val: boolean) => {
    this.resending = val;
  };

  setMessage = (type: string, msg: string) => {
    this.message.type = type;
    this.message.msg = msg;
  };

  setError = (err: string) => {
    this.error.msg = err;
  };

  setSuccess = (msg: string) => {
    this.success.msg = msg;
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
}
