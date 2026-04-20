import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";   // ✅ added

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  

  // 🔥 UPDATED FUNCTION
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        // ✅ REGISTER API
        const res = await axios.post("http://localhost:8080/register", {
          name,
          email,
          password,
        });

        if (res.data.msg) {
          setMessage("Account created successfully ✅");
          setState("Login"); // switch to login
        } else {
          setMessage(res.data.error);
        }

      } else {
        // ✅ LOGIN API
        const res = await axios.post("http://localhost:8080/login", {
          email,
          password,
        });

        if (res.data.msg === "Login success") {
          setMessage("Login successful ✅");

          // ✅ SAVE USER
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);

          setTimeout(() => {
            navigate("/");
          }, 1000);

        } else {
          setMessage(res.data.error);
        }
      }

    } catch (error) {
      console.log(error);
      setMessage("Server error ❌");
    }

    // clear inputs
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>

        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {message && (
          <p className="text-green-600 text-sm">{message}</p>
        )}

        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
                setMessage("");
              }}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
                setMessage("");
              }}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;