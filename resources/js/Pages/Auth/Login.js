import ApplicationLogo from "@/Components/ApplicationLogo";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import React, { useEffect } from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/inertia-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function Login({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: "",
    password: "",
    remember: "",
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast(<ValidationErrors errors={errors}></ValidationErrors>, {
        position: "bottom-left",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [status, errors]);

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();

    if (data.username.length < 1) {
      toast.warning("Username harus diisi", {
        toastId: 1,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (data.password.length < 1) {
      toast.warning("Password harus diisi", {
        toastId: 2,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    post(route("login"));
  };

  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <section className="w-full p-6 flex justify-center">
        <form
          onSubmit={submit}
          className="relative p-16 w-full lg:w-6/12"
          style={{ backgroundColor: "#E6ECF0" }}
        >
          <InertiaLink href="/">
            <ApplicationLogo className="logo w-16" fill="#005096" />
          </InertiaLink>

          <div>
            <Label forInput="username" value="Username" />

            <Input
              type="text"
              name="username"
              value={data.username}
              className="mt-1 block w-full"
              autoComplete="username"
              isFocused={true}
              handleChange={onHandleChange}
            />
          </div>

          <div className="mt-4">
            <Label forInput="password" value="Password" />

            <Input
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              handleChange={onHandleChange}
            />
          </div>

          <div className="block mt-4">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                value={data.remember}
                handleChange={onHandleChange}
              />

              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button
              className="mx-auto w-3/4 text-center bg-blue-400"
              processing={processing}
            >
              Login
            </Button>
          </div>
        </form>
      </section>
      <img
        src="/assets/login.png"
        className="hidden lg:max-h-screen lg:block"
      />
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
}
