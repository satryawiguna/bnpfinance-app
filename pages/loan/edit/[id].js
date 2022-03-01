import Head from "next/head";
import AppLayout from "../../../components/Layouts/AppLayout";
import { useState, useEffect } from "react";
import Select from "../../../components/Select";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import AuthValidationErrors from "../../../components/AuthValidationErrors";
import { useLoan } from "../../../hooks/useLoan";
import { useUser } from "../../../hooks/useUser";
import axios from "../../../lib/axios";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";

import "react-datepicker/dist/react-datepicker.css";

const EditLoan = () => {
  const router = useRouter();
  const { id } = router.query;

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  const [user_id, setUserId] = useState("");
  const [principal, setPrincipal] = useState("");
  const [installment, setInstallment] = useState("");
  const [loan_start_date, setLoanStartDate] = useState(null);
  const [loan_end_date, setLoanEndDate] = useState(null);
  const [period, setPeriod] = useState("");
  const [interest, setInterest] = useState("");

  const { updateLoan } = useLoan();

  const fetchLoan = async () => {
    const { data: loan } = await axios.get(`/loan/${id}`);

    const lsd = new Date(loan.data.loan_start_date);
    const led = new Date(loan.data.loan_end_date);

    setUserId(loan.data.user_id ?? "");
    setPrincipal(loan.data.principal ?? "");
    setInstallment(loan.data.installment ?? "");
    setLoanStartDate(lsd ?? null);
    setLoanEndDate(led ?? null);
    setPeriod(loan.data.period ?? "");
    setInterest(loan.data.interest ?? "");
  };

  const closeErrorHandler = () => {
    setErrors([]);
  };

  const handleUserChange = (event) => {
    setUserId(event.target.value);
  };

  const handleEditLoan = (event) => {
    event.preventDefault();

    setErrors([]);

    updateLoan({
      setErrors,
      id,
      user_id,
      principal,
      installment,
      loan_start_date,
      loan_end_date,
      period,
      interest,
    });
  };

  const getUsers = () => {
    axios.get("/users").then((res) => {
      setUsers(res.data);
      setUserId(res.data.data[0].id);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      fetchLoan();
    }
  }, [router.isReady]);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Edit Loan
        </h2>
      }
    >
      <Head>
        <title>BnP Finance - Edit Loan</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <AuthValidationErrors
                className="mb-4"
                errors={errors}
                onClick={closeErrorHandler}
              />

              <form onSubmit={handleEditLoan}>
                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <Select
                    id="customer"
                    selected={user_id}
                    options={users?.data}
                    value="id"
                    text="email"
                    onChange={handleUserChange}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="principal">Principal</Label>
                  <Input
                    id="principal"
                    type="text"
                    value={principal}
                    placeholder="Principal"
                    className="block mt-1 w-full"
                    onChange={(event) => setPrincipal(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="installment">Installment</Label>
                  <Input
                    id="installment"
                    type="text"
                    value={installment}
                    placeholder="Installment"
                    className="block mt-1 w-full"
                    onChange={(event) => setInstallment(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="loan_start_date">Loan Start Date</Label>
                  <DatePicker
                    selected={loan_start_date}
                    onChange={(date) => setLoanStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="block mt-1 w-full p-2 mt-1 flex rounded-md shadow-sm"
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="loan_end_date">Loan End Date</Label>
                  <DatePicker
                    selected={loan_end_date}
                    onChange={(date) => setLoanEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="block mt-1 w-full p-2 mt-1 flex rounded-md shadow-sm"
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="period">Period</Label>
                  <Input
                    id="period"
                    type="text"
                    value={period}
                    placeholder="Period"
                    className="block mt-1 w-full"
                    onChange={(event) => setPeriod(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="interest">Interest</Label>
                  <Input
                    id="interest"
                    type="text"
                    value={interest}
                    placeholder="Interest"
                    className="block mt-1 w-full"
                    onChange={(event) => setInterest(event.target.value)}
                  />
                </div>
                <div className="flex items-center justify-start mt-10">
                  <Button
                    className="bg-red-800 mr-2"
                    onClick={() => router.push("/loans")}
                  >
                    Cancel
                  </Button>
                  <Button>Update Loan</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EditLoan;
