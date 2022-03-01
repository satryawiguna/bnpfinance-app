import Head from "next/head";
import AppLayout from "../../../components/Layouts/AppLayout";
import Button from "../../../components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { usePayment } from "../../../hooks/usePayment";

const LoanPayments = () => {
  const router = useRouter();
  const { id } = router.query;

  const [payments, setPayments] = useState([]);
  const [loans, setLoans] = useState([]);
  const [errors, setErrors] = useState([]);

  const { getLoanPayments, getUserLoan } = usePayment();

  useEffect(() => {
    const fetchPayments = async () => {
      const dataFetchPayments = await getLoanPayments({ setErrors, id });

      setPayments(dataFetchPayments);
    };

    const fetchLoans = async () => {
      const dataFetchLoans = await getUserLoan({ setErrors, id });

      setLoans(dataFetchLoans);
    };

    if (router.isReady) {
      fetchPayments();
      fetchLoans();
    }
  }, [router.isReady]);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Loan Payments
        </h2>
      }
    >
      <Head>
        <title>BnP Finance - Loan Payments</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="my-5">
                <Link href="/loans">
                  <a>
                    <Button type="button" className="bg-green-800">
                      Back
                    </Button>
                  </a>
                </Link>
              </div>
              <div className="my-5">
                <div className="flex flex-row">
                  <div className="flex-column w-1/2">
                    <h2>
                      <strong>Customer</strong>
                    </h2>
                    <strong>Identity : </strong>&nbsp;
                    {loans.data?.userProfile.data.profile.data.identity_number}
                    <br />
                    <strong>Full Name : </strong>&nbsp;
                    {loans.data?.userProfile.data.profile.data.full_name}
                    <br />
                    <strong>Email : </strong>&nbsp;
                    {loans.data?.userProfile.data.email}
                  </div>
                  <div className="flex-column w-1/2">
                    <h2>
                      <strong>Loan</strong>
                    </h2>
                    <strong>Start Date : </strong>&nbsp;
                    {loans.data?.loan_start_date}
                    <br />
                    <strong>End Date : </strong>&nbsp;
                    {loans.data?.loan_end_date}
                  </div>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Balance
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments ? (
                    payments.data?.length > 0 ? (
                      payments.data.map((payment, index) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {payment.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {payment.balance}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {payment.payment_date}
                          </td>
                          <td className="px-6 py-4">{payment.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap" colSpan="9">
                          No Records
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap" colSpan="9">
                        Loading...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LoanPayments;
