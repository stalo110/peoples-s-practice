import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export const LogIn = async (details: any) => {
  try {
    const response: any = await signInWithEmailAndPassword(
      auth,
      details.email,
      details.password
    );

    return {
      error: false,
      data: response,
    };
  } catch (err: any) {
    return {
      error: true,
      data: err,
    };
  }
};

//Signout user
export const LogOut = async () => {
  try {
    await signOut(auth);
    window.sessionStorage.clear();
    window.localStorage.clear();
    return {
      error: false,
      data: null,
    };
  } catch (error: any) {
    return { error: true, data: null };
  }
};
