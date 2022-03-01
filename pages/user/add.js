import Head from "next/head";
import AppLayout from "../../components/Layouts/AppLayout";
import { useState } from "react";
import Select from "../../components/Select";
import Label from "../../components/Label";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import AuthValidationErrors from "../../components/AuthValidationErrors";
import { useUser } from "../../hooks/useUser";

const AddUser = () => {
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

  const genders = [
    {
      id: 1,
      name: "male",
    },
    {
      id: 2,
      name: "female",
    },
  ];

  const [errors, setErrors] = useState([]);

  const [identity_number, setIdentityNumber] = useState("");
  const [full_name, setFullName] = useState("");
  const [nick_name, setNickName] = useState("");
  const [gender, setGender] = useState("male");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [post_code, setPostCode] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [role_id, setRoleId] = useState(1);

  const { storeUser } = useUser();

  const closeErrorHandler = () => {
    setErrors([]);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRoleId(event.target.value);
  };

  const handleAddUser = (event) => {
    event.preventDefault();

    setErrors([]);

    storeUser({
      setErrors,
      identity_number,
      full_name,
      nick_name,
      gender,
      nationality,
      address,
      post_code,
      phone,
      role_id,
      username,
      email,
      password,
      password_confirmation,
    });
  };

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Add User
        </h2>
      }
    >
      <Head>
        <title>BnP Finance - Add User</title>
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

              <form onSubmit={handleAddUser}>
                <div>
                  <Label htmlFor="identity-number">Identity Number</Label>
                  <Input
                    id="identity-number"
                    type="text"
                    value={identity_number}
                    placeholder="Identity Number"
                    className="block mt-1 w-full"
                    onChange={(event) => setIdentityNumber(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    type="text"
                    value={full_name}
                    placeholder="Full Name"
                    className="block mt-1 w-full"
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="nick-name">Nick Name</Label>
                  <Input
                    id="nick-name"
                    type="text"
                    value={nick_name}
                    placeholder="Nick Name"
                    className="block mt-1 w-full"
                    onChange={(event) => setNickName(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    id="gender"
                    selected={gender}
                    options={genders}
                    value="name"
                    text="name"
                    onChange={handleGenderChange}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    type="text"
                    value={nationality}
                    placeholder="Nationality"
                    className="block mt-1 w-full"
                    onChange={(event) => setNationality(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="address">Address</Label>
                  <TextArea
                    id="address"
                    value={address}
                    placeholder="Address"
                    className="block mt-1 w-full"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="post-code">Postcode</Label>
                  <Input
                    id="post-code"
                    type="text"
                    value={post_code}
                    placeholder="Post Code"
                    className="block mt-1 w-full"
                    onChange={(event) => setPostCode(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    placeholder="Phone"
                    className="block mt-1 w-full"
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
                <hr className="my-10" />
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    id="role"
                    selected={role_id}
                    options={roles}
                    value="id"
                    text="name"
                    onChange={handleRoleChange}
                  />
                </div>
                <hr className="my-10" />
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    placeholder="Username"
                    className="block mt-1 w-full"
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    className="block mt-1 w-full"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
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
                    type="password"
                    value={password_confirmation}
                    placeholder="Password Confirmation"
                    className="block mt-1 w-full"
                    onChange={(event) =>
                      setPasswordConfirmation(event.target.value)
                    }
                  />
                </div>
                <div className="flex items-center justify-start mt-10">
                  <Button>Save User</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddUser;
