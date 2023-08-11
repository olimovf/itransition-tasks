import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { REGISTER_URL } from "../api/urls";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(REGISTER_URL, formData);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setErrMsg("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(err?.response?.data.message);
      }
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-12 col-md-5">
          <div className="form-wrapper border rounded p-4 shadow bg-white">
            {success ? (
              <>
                <p className="fs-5 mb-1">You are registered succssfully!</p>
                <p className="fs-5 mb-0">
                  Please, <Link to="/login">login</Link> to continue
                </p>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <h2 className="h3 text-center">Register</h2>
                </div>
                {errMsg && (
                  <div className="alert alert-danger" role="alert">
                    {errMsg}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  Sign up
                </button>
                <div className="mt-2 text-end">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
