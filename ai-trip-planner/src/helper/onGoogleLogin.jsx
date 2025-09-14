// googleLogin.js
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { auth, provider } from "./firebase";
import axios from "axios";

export const onGoogleLogin = async (fetchUserData) => {
  const googleResponse = await signInWithPopup(auth, provider);
  const data = {
    username: googleResponse?.user?.displayName,
    email: googleResponse?.user?.email,
    imageUrl: googleResponse?.user?.photoURL,
  };

  try {
    const response = await axios.post(
      `/api/v1/user/create-account`,
      data,
      { withCredentials: true }
    );

    if (response.data?.success) {
      localStorage.setItem("token", response.data?.token);

      toast.success(response.data?.message);

      // ✅ Refresh user data in context
      if (fetchUserData) {
        await fetchUserData();
      }
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong with Login"
    );
  }
};
