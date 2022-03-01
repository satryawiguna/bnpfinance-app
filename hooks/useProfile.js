import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "../lib/axios";

export const useProfile = () => {
  const swal = withReactContent(Swal);

  const getProfileMe = async ({ setErrors, ...props }) => {
    setErrors([]);

    const profile = await axios.get("/profile/me");

    return profile.data;
  };

  const getMe = async ({ setErrors }) => {
    setErrors([]);

    const user = await axios.get("/auth/me");

    return user.data;
  };

  const updateProfile = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .put("/profile/me/update", props)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile Updated",
        });
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const updatePassword = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .put("/profile/me/password/update", props)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Password Updated",
        });
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  return {
    getProfileMe,
    getMe,
    updateProfile,
    updatePassword,
  };
};
