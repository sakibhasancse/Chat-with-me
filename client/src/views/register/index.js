import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validateInputFields } from "../login/login-helper";
import apiRequest from "../../services/ApiRequest/apiRequest.service";

const Register = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    phone_number: "",
    password: "",
    re_password: "",
    full_name: "",
    email: "",
  });

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const errors = validateInputFields(values);
    if (errors.length) setErrors(errors);
    else {
      const response = await apiRequest({
        method: "POST",
        path: "api/v1/user/signup/",
        data: values,
      });
      if (response.error) {
        setErrors({ error: response.error });
      } else navigate("/login");
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setValues((oldValue) => ({
      ...oldValue,
      [event.target.name]: event.target.value,
    }));
  };

  console.log({ errors, loading });
  return (
    <div className="col-lg-6">
      <div className="p-lg-5 p-4">
        <div>
          <h5 className="text-primary">Register Account</h5>
          <p className="text-muted">Get your Free Velzon account now.</p>
        </div>
        <div className="mt-4">
          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="useremail" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="useremail"
                placeholder="Enter email address"
                value={values.email}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please enter email</div>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone number <span className="text-danger">*</span>
              </label>
              <input
                id="phone"
                name="phone_number"
                type="number"
                placeholder="Enter your phone number"
                value={values.phone_number}
                onChange={handleChange}
                className="form-control"
                required
              />
              <div className="invalid-feedback">Please enter email</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password-input">
                Password
              </label>
              <div className="position-relative auth-pass-inputgroup">
                <input
                  type="password"
                  name="password"
                  className="form-control pe-5 password-input"
                  onPaste="return false"
                  placeholder="Enter password"
                  id="password-input"
                  aria-describedby="passwordInput"
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                <button
                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                  type="button"
                  id="password-addon"
                >
                  <i className="ri-eye-fill align-middle" />
                </button>
                <div className="invalid-feedback">Please enter password</div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password-input">
                Re-password
              </label>
              <div className="position-relative auth-pass-inputgroup">
                <input
                  type="password"
                  name="re_password"
                  className="form-control pe-5 password-input"
                  onPaste="return false"
                  placeholder="Enter password"
                  id="password-input"
                  aria-describedby="passwordInput"
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  value={values.re_password}
                  onChange={handleChange}
                  // required
                />
                <button
                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                  type="button"
                  id="password-addon"
                >
                  <i className="ri-eye-fill align-middle" />
                </button>
                <div className="invalid-feedback">Please enter password</div>
              </div>
            </div>
            <div className="mb-4">
              <p className="mb-0 fs-12 text-muted fst-italic">
                By registering you agree to the Velzon{" "}
                <a
                  href="/"
                  className="text-primary text-decoration-underline fst-normal fw-medium"
                >
                  Terms of Use
                </a>
              </p>
            </div>
            <div id="password-contain" className="p-3 bg-light mb-2 rounded">
              <h5 className="fs-13">Password must contain:</h5>
              <p id="pass-length" className="invalid fs-12 mb-2">
                Minimum <b>8 characters</b>
              </p>
              <p id="pass-lower" className="invalid fs-12 mb-2">
                At <b>lowercase</b> letter (a-z)
              </p>
              <p id="pass-upper" className="invalid fs-12 mb-2">
                At least <b>uppercase</b> letter (A-Z)
              </p>
              <p id="pass-number" className="invalid fs-12 mb-0">
                A least <b>number</b> (0-9)
              </p>
            </div>
            <div className="mt-4">
              <button className="btn btn-success w-100" type="submit">
                Sign Up
              </button>
            </div>
            <div className="mt-4 text-center">
              <div className="signin-other-title">
                <h5 className="fs-13 mb-4 title text-muted">
                  Create account with
                </h5>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-icon waves-effect waves-light"
                >
                  <i className="ri-facebook-fill fs-16" />
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-icon waves-effect waves-light"
                >
                  <i className="ri-google-fill fs-16" />
                </button>
                <button
                  type="button"
                  className="btn btn-dark btn-icon waves-effect waves-light"
                >
                  <i className="ri-github-fill fs-16" />
                </button>
                <button
                  type="button"
                  className="btn btn-info btn-icon waves-effect waves-light"
                >
                  <i className="ri-twitter-fill fs-16" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-5 text-center">
          <p className="mb-0">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="fw-semibold text-primary text-decoration-underline"
            >
              {" "}
              Signin
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
