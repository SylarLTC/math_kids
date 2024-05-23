import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validationPassword } from "../utils/validation";
import { useAuthContext } from "../hooks/useAuthContext";

export const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [err, setErr] = useState(null);
  const { register } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (validationPassword(inputs.password) === true) {
      try {
        register(inputs);
        navigate("/verify-email");
        setErr("Passed");
      } catch (error) {
        setErr(error.response.data);
      }
    } else {
      setErr(
        "Password must contain at least 8 characters, at least one special character, one uppercase letter, one lowercase letter and one number"
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-sky-50">
      <div className="w-3/4 flex flex-row-reverse bg-white rounded-xl min-h-[600px] overflow-hidden">
        <div className="flex-1 bg-red-300 bg-cover p-14 flex-col gap-8 text-white hidden lg:flex ">
          <h1 className="text-[100px] leading-[100px]">ME Studying.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span className="text-[14px]">Do you have an account?</span>
          <Link to="/login">
            <button className="w-1/2 p-2 border-none bg-white text-red-400 font-bold cursor-pointer">
              Login
            </button>
          </Link>
        </div>
        <div className="flex-1 p-14 flex flex-col gap-8 justify-center">
          <h1 className=" text-red-400 text-2xl font-bold">Register</h1>
          <form className="flex flex-col gap-7">
            <input
              className="px-[20px] py-[10px]"
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              className="px-[20px] py-[10px]"
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />

            <input
              className="px-[20px] py-[10px]"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />

            <div className="flex">
              <input
                id="check"
                type="checkbox"
                value={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
                className="ml-[20px]"
              />
              <label
                for="check"
                className="text-sm text-gray-500 ms-3 dark:text-neutral-400"
              >
                Show Password
              </label>
            </div>

            {err && err}
            <button
              className="w-1/2 p-2 border-none bg-sky-200 text-red-400 font-bold cursor-pointer"
              onClick={handleClick}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
