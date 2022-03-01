import Head from "next/head";
import AppLayout from "../components/Layouts/AppLayout";
import { useState, useEffect } from "react";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import { useProfile } from "../hooks/useProfile";
import AuthValidationErrors from "../components/AuthValidationErrors";
import Select from "../components/Select";

const Setting = () => {
  const roles = [
    {
      id: 1,
      name: "admin",
    },
    {
      id: 2,
      name: "customer",
    },
  ];

  const [errors, setErrors] = useState([]);

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const { getMe, updatePassword } = useProfile();

  const fetchMe = async () => {
    const user = await getMe({ setErrors });

    setEmail(user.email);
    setUserName(user.username);
  };

  const closeErrorHandler = () => {
    setErrors([]);
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();

    setErrors([]);

    if (password != "") {
      if (errorItems.length == 0) {
        updatePassword({
          password,
          password_confirmation,
          setErrors,
        });
      }
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Setting
        </h2>
      }
    >
      <Head>
        <title>BnP Finance - Setting</title>
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

              <form onSubmit={handleUpdatePassword}>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    disabled={true}
                    value={email}
                    placeholder="Email"
                    className="block mt-1 w-full"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    disabled={true}
                    value={username}
                    placeholder="Username"
                    className="block mt-1 w-full"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    placeholder="Password"
                    className="block mt-1 w-full"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="password-confirmation">
                    Password Confirmation
                  </Label>
                  <Input
                    id="password-confirmation"
                    type="text"
                    value={password_confirmation}
                    placeholder="Password Confirmation"
                    className="block mt-1 w-full"
                    onChange={(event) =>
                      setPasswordConfirmation(event.target.value)
                    }
                  />
                </div>
                <div className="flex items-center justify-start mt-10">
                  <Button>Update Password</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Setting;
