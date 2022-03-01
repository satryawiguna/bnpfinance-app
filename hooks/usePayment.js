import useSWR from "swr";
import axios from "../lib/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

export const usePayment = () => {
  const swal = withReactContent(Swal);

  const router = useRouter();

  const paymentsFetcher = async (url) => {
    return await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    data: payments,
    error,
    mutate,
  } = useSWR("/payments", paymentsFetcher);

  const getLoanPayments = async ({ setErrors, id }) => {
    setErrors([]);

    const payments = await axios.get(`/loan/${id}/payments`);

    return payments.data;
  };

  const getUserLoan = async ({ setErrors, id }) => {
    setErrors([]);

    const loan = await axios.get(`/loan/${id}`);

    return loan.data;
  };

  const storePayment = async ({ setErrors, ...props }) => {
    setErrors([]);

    axios
      .post("/payment/store", props)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Payment Added",
        });

        router.push("/payments");
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const updatePayment = async ({ setErrors, id, ...props }) => {
    setErrors([]);

    axios
      .put(`/payment/${id}/update`, props)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Payment Added",
        });

        router.push("/payments");
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const deletePayment = async ({ setErrors, id }) => {
    setErrors([]);

    axios
      .delete(`/payment/${id}/delete`)
      .then(() => {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Payment Deleted",
        });

        mutate();
      })
      .catch((error) => {
        if (!error) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  return {
    payments,
    storePayment,
    updatePayment,
    deletePayment,
    getLoanPayments,
    getUserLoan,
  };
};
