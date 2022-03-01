import Head from "next/head";
import AppLayout from "../components/Layouts/AppLayout";
import { useEffect, useState } from "react";
import Select from "../components/Select";
import Label from "../components/Label";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import { useProfile } from "../hooks/useProfile";
import AuthValidationErrors from "../components/AuthValidationErrors";

const Profile = () => {
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
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [post_code, setPostCode] = useState("");
  const [phone, setPhone] = useState("");

  const { getProfileMe, updateProfile } = useProfile();

  const fetchProfile = async () => {
    const profile = await getProfileMe({ setErrors });

    setIdentityNumber(profile.data.identity_number);
    setFullName(profile.data.full_name);
    setNickName(profile.data.nick_name);
    setGender(profile.data.gender !== null ? profile.data.gender : "");
    setNationality(
      profile.data.nationality !== null ? profile.data.nationality : ""
    );
    setAddress(profile.data.address !== null ? profile.data.address : "");
    setPostCode(profile.data.post_code !== null ? profile.data.post_code : "");
    setPhone(profile.data.phone !== null ? profile.data.phone : "");
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const closeErrorHandler = () => {
    setErrors([]);
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    setErrors([]);

    let errorItems = [];

    if (identity_number == "") {
      errorItems.push("Identity number is required");
    }

    if (full_name == "") {
      errorItems.push("Full name is required");
    }

    if (nick_name == "") {
      errorItems.push("Nick name is required");
    }

    setErrors(errorItems);

    if (errorItems.length == 0) {
      updateProfile({
        identity_number,
        full_name,
        nick_name,
        gender,
        nationality,
        address,
        post_code,
        phone,
        setErrors,
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Profile
        </h2>
      }
    >
      <Head>
        <title>BnP Finance - Profile</title>
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

              <form onSubmit={handleUpdateProfile}>
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
                <div className="flex items-center justify-start mt-10">
                  <Button>Update Profile</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
