import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("photo", photo);
      const res = await axios.post("/api/v1/auth/register", formData);

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("User Already Register");
    }
  };

  return (
    <div className="container register-container">
      <h1 className="text-center mt-2 mb-3">Registration for DNS Sysytem</h1>

      <div className="row">
        <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
          <img
            alt="social "
            className="socialDesktop"
            height="500rem"
            src="https://c8.alamy.com/comp/2AKX8GF/registration-form-concept-icon-sign-up-idea-thin-line-illustration-web-personal-profile-website-contact-form-login-authorization-tab-vector-isol-2AKX8GF.jpg"
          />
        </div>
        <div className="col-md-5 col-sm-12">
          <div className="card shadow">
            <div className="card-body px-5">
              <h4 className="card-title text-center mt-3 fw-bold">Sign Up</h4>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="p-2 mt-4  mb-2 form-control input-bg"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className="p-2   mb-2 form-control input-bg"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="Number"
                  className="p-2  mb-2 form-control input-bg"
                  placeholder="Emter Mobile No..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="password"
                  className=" p-2 mb-2 form-control input-bg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>

                <div className=" mt-3 d-grid">
                  <button className="custom-btn custom-btn-blue">
                    Register
                  </button>
                </div>
                <div className="mt-3">
                  <hr className="text-muted" />
                  <h3 className="text-muted text-center">OR</h3>
                  <hr className="text-muted" />
                </div>

                <div className="mt-3 mb-5 d-grid">
                  <button className="custom-btn custom-btn-white">
                    <span className="text-muted fs-6">
                      Already have an account
                    </span>
                    <Link to="/login" className="ms-1 text-info fw-bold">
                      log in
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

export default Register;
