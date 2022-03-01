import Head from "next/head";
import AppLayout from "../components/Layouts/AppLayout";
import { useLoan } from "../hooks/useLoan";
import Button from "../components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Payments = () => {
  const swal = withReactContent(Swal);
  const router = useRouter();

  const [errors, setErrors] = useState([]);

  const { payments, deletePayment } = usePayment();

  const handleDeletePayment = (id) => {
    swal
      .fire({
        icon: "warning",
        title: "Do you want to delete it?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletePayment({
            setErrors,
            id,
          });
        }
      });
  };

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Payments
        </h2>
      }
    >
      <Head>
        <title>BnP Finance - Payments</title>
      </Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="my-5">
                <Link href="/loan/add">
                  <a>
                    <Button type="button" className="bg-green-800">
                      Add Loan
                    </Button>
                  </a>
                </Link>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Principal
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Installment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Durations
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Period
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Interest
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loans ? (
                    loans.data.length > 0 ? (
                      loans.data.map((loan, index) => (
                        <tr key={loan.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {loan.userProfile.data.profile.data.full_name}
                            <br />
                            {loan.status == "debt" ? (
                              <span className="text-red-800 text-xs">
                                Debt off
                              </span>
                            ) : (
                              <span className="text-green-800 text-xs">
                                Paid off
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {loan.principal}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {loan.installment}
                          </td>
                          <td className="px-6 py-4">
                            <strong>Start: </strong>
                            {loan.loan_start_date}
                            <br />
                            <strong>End: </strong>
                            {loan.loan_end_date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {loan.period}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {loan.interest}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {loan.status == "debt" ? (
                              <>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    router.push(`/loan/edit/${loan.id}`)
                                  }
                                >
                                  Edit
                                </Button>{" "}
                                <Button
                                  type="button"
                                  onClick={() => handleDeleteLoan(loan.id)}
                                  className="bg-red-800"
                                >
                                  Delete
                                </Button>{" "}
                                <Button
                                  type="button"
                                  onClick={() => handleUpdateToPaid(loan.id)}
                                  className="bg-blue-800"
                                >
                                  Paid
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button type="button" disabled={true}>
                                  Edit
                                </Button>{" "}
                                <Button
                                  type="button"
                                  disabled={true}
                                  className="bg-red-800"
                                >
                                  Delete
                                </Button>{" "}
                                <Button
                                  type="button"
                                  disabled={true}
                                  className="bg-blue-800"
                                >
                                  Paid
                                </Button>
                              </>
                            )}
                          </td>
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

export default Payments;
