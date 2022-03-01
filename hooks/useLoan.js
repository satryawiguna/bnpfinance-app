import useSWR from "swr";
import axios from "../lib/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

export const useLoan = () => {
  const swal = withReactContent(Swal);

  const router = useRouter();

  const loansFetcher = async (url) => {
    return await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  };

  const { data: loans, error, mutate } = useSWR("/loans", loansFetcher);

  const storeLoan = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .post("/loan/store", props)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Loan Added",
        });

        router.push("/loans");
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const updateLoan = async ({ setErrors, id, ...props }) => {
    setErrors([]);

    axios
      .put(`/loan/${id}/update`, props)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Loan Updated",
        });

        router.push("/loans");
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const deleteLoan = async ({ setErrors, id }) => {
    setErrors([]);

    axios
      .delete(`/loan/${id}/delete`)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Loan Deleted",
        });

        mutate();
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const updateToPaid = async ({ setErrors, id }) => {
    setErrors([]);

    axios
      .put(`/loan/${id}/updateToPaid`)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Loan was update to paid",
        });

        mutate();
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  return {
    loans,
    storeLoan,
    updateLoan,
    deleteLoan,
    updateToPaid,
  };
};
