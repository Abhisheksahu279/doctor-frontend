import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/register", {
        name,
        email,
        password,
      });

      if (res.data.msg) {
        setMessage("Account created successfully ✅");

        // redirect to login after 1 sec
        setTimeout(() => {
          navigate("/login");
        }, 1000);

      } else {
        setMessage(res.data.error);
      }

    } catch (error) {
      console.log(error);
      setMessage("Server error ❌");
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleRegister} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">

        <p className="text-2xl font-semibold">Create Account</p>

        <p>Please sign up to book appointment</p>

        {/* Name */}
        <div className="w-full">
          <p>Full Name</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Message */}
        {message && (
          <p className="text-green-600 text-sm">{message}</p>
        )}

        {/* Button */}
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Register
        </button>

        {/* Go to Login */}
        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary underline cursor-pointer"
          >
            Login here
          </span>
        </p>

      </div>
    </form>
  );
};

export default Register;