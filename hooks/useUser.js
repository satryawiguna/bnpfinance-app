import useSWR from "swr";
import axios from "../lib/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

export const useUser = () => {
  const swal = withReactContent(Swal);

  const router = useRouter();

  const usersFetcher = async (url) => {
    return await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  };

  const { data: users, error, mutate } = useSWR("/users", usersFetcher);

  const storeUser = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .post("/user/store", props)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "User Added",
        });

        router.push("/users");
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const updateUser = async ({ setErrors, id, ...props }) => {
    setErrors([]);

    axios
      .put(`/user/${id}/update`, props)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "User Added",
        });

        router.push("/users");
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const deleteUser = async ({ setErrors, id }) => {
    setErrors([]);

    axios
      .delete(`/user/${id}/delete`)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "User Deleted",
        });

        mutate();
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  return {
    users,
    storeUser,
    updateUser,
    deleteUser,
  };
};
