import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/authContect.js";
const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      toast.success(res.data.message);
      setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/create-dns");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container login-container mt-5">
      <div className="row">
        <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
          <img
            alt="photo"
            className="photo"
            height="400vh"
            src="https://media.istockphoto.com/id/1426988809/photo/security-password-login-online-concept-hands-typing-and-entering-username-and-password-of.webp?b=1&s=170667a&w=0&k=20&c=AJD5Wv30lmyILccJyMpQGhkmh0VhZ5WNDtk53MO1OVM="
          />
        </div>
        <div className="col-md-5 col-sm-12">
          <div className="card shadow">
            <div className="card-body px-5">
              <h4 className="card-title text-center mt-3 fw-bold">Log In</h4>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 mt-4  mb-2 form-control input-bg"
                  placeholder="Phone number,username or email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" p-2 mb-2 form-control input-bg"
                  placeholder="Password"
                />
                <div className=" mt-3 d-grid">
                  <button className="custom-btn custom-btn-blue">login</button>
                </div>
                <div className="mt-3">
                  <hr className="text-muted" />
                  <h3 className="text-muted text-center">OR</h3>
                  <hr className="text-muted" />
                </div>

                <div className="mt-3 mb-5 d-grid">
                  <button className="custom-btn custom-btn-white">
                    <span className="text-muted fs-6">
                      Don't have an account?
                    </span>
                    <Link to="/register" className="ms-1 text-info fw-bold">
                      Register
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
