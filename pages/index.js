import Head from "next/head";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth({ middleware: "guest" });

  return (
    <>
      <Head>
        <title> BNP Finance </title>
      </Head>

      <div className="relative flex items-top justify-center min-h-screen bg-blue-100 dark:bg-blue-900 sm:items-center sm:pt-0">
        <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
          {" "}
          {user ? (
            <Link href="/dashboard">
              <a className="ml-4 text-sm text-white underline">Dashboard</a>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <a className="text-sm text-white underline"> Login </a>
              </Link>
              <Link href="/register">
                <a className="ml-4 text-sm text-white underline">Register</a>
              </Link>
            </>
          )}
        </div>
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-center pt-8 sm:justify-start sm:pt-0"></div>
        </div>
      </div>
    </>
  );
}
