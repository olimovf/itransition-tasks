import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-12 col-md-5">
          <div className="form-wrapper border rounded p-4 shadow bg-white">
            <form>
              <div className="mb-3">
                <h3 className="h3 text-center">Login</h3>
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
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              <div className="mt-2 text-end">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
