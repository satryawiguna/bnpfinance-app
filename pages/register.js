import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import GuestLayout from "../components/Layouts/GuestLayout";
import AuthCard from "../components/AuthCard";
import Link from "next/link";
import Logo from "../components/Logo";
import AuthValidationErrors from "../components/AuthValidationErrors";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [full_name, setFullName] = useState("");
  const [nick_name, setNickName] = useState("");
  const [identity_number, setIdentityNumber] = useState("");
  const [errors, setErrors] = useState([]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    register({
      username,
      email,
      password,
      password_confirmation,
      full_name,
      nick_name,
      identity_number,
      setErrors,
    });
  };

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/">
            <a>
              <Logo className="w-50 h-10 fill-current text-gray-500 login-title" />
            </a>
          </Link>
        }
      >
        <AuthValidationErrors className="mb-4" errors={errors} />

        <form onSubmit={submitFormHandler}>
          <div>
            <Label htmlFor="full_name">Full name</Label>

            <Input
              id="full_name"
              type="text"
              value={full_name}
              className="block mt-1 w-full"
              onChange={(event) => setFullName(event.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="nick_name">Nick name</Label>

            <Input
              id="nick_name"
              type="text"
              value={nick_name}
              className="block mt-1 w-full"
              onChange={(event) => setNickName(event.target.value)}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="identity_number">Identity Number</Label>

            <Input
              id="identity_number"
              type="number"
              value={identity_number}
              className="block mt-1 w-full"
              onChange={(event) => setIdentityNumber(event.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="username">Username</Label>

            <Input
              id="username"
              type="text"
              value={username}
              className="block mt-1 w-full"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="password_confirmation">Password Confirmation</Label>

            <Input
              id="password_confirmation"
              type="password"
              value={password_confirmation}
              className="block mt-1 w-full"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link href="/login">
              <a className="underline text-sm text-gray-600 hover:text-gray-900">
                Already registered?
              </a>
            </Link>

            <Button className="ml-4">Register</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  );
};

export default Register;
