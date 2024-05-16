import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosRequest } from "../utils/axiosConfig";

export const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axiosRequest.post("/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-sky-50">
      <div className="w-3/4 flex flex-row-reverse bg-white rounded-xl min-h-[600px] overflow-hidden">
        <div className="flex-1 bg-red-300 bg-cover p-14 flex flex-col gap-8 text-white">
          <h1 className="text-[100px] leading-[100px]">Math Exercises.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span className="text-[14px]">Do you have an account?</span>
          <Link to="/login">
            <button className="w-1/2 p-2 border-none bg-white text-red-500 font-bold cursor-pointer">
              Login
            </button>
          </Link>
        </div>
        <div className="flex-1 p-14 flex flex-col gap-8 justify-center">
          <h1 className="text-white">Register</h1>
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
              type="password"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {err && err}
            <button
              className="w-1/2 p-2 border-none bg-sky-200 text-rose-500 font-bold cursor-pointer"
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
