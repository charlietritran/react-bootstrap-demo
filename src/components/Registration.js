import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

// REDUX
import store from "../store";
import { selectUserRegistration } from "../redux/selectors/userSelectors";
import { registerUser } from "../redux/actions/user";

/** /////////////////////////////////////////////////////////////////
 * COMPONENT: Registration
 *
 * PURPOSE:
 *
 * @returns
 *
 *
 */ ////////////////////////////////////////////////////////////////
const Registration = () => {
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    store.dispatch(registerUser({ data }));
    setFullname(selectUserRegistration(store.getState()).data.fullname);
    setUsername(selectUserRegistration(store.getState()).data.username);
    setEmail(selectUserRegistration(store.getState()).data.email);
    setPassword(selectUserRegistration(store.getState()).data.password);
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    //store.dispatch(updateUser({username:"tritran"}));
    //alert("STATE:" + JSON.stringify(store.getState().user.userData));
    //alert("SELECT STATE:" + JSON.stringify(selectUserData(store.getState())));
    //setCurrentUser(selectUserData(store.getState()));
  }, []); // Add empty array to force it run only one time.  no repeat after render

  return (
    <div>
      <h1>Registration Page</h1>
      <div className="register-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group w-25">
            <label>Full Name</label>
            <input
              name="fullname"
              type="text"
              {...register("fullname")}
              className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
            />
          </div>

          <div className="form-group w-25">
            <label>Username</label>
            <input
              name="username"
              type="text"
              {...register("username")}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
          </div>

          <div className="form-group w-25">
            <label>Email</label>
            <input
              name="email"
              type="text"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
          </div>

          <div className="form-group w-25">
            <label>Password</label>
            <input
              name="password"
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
          </div>

          <div className="form-group w-25">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
            />
          </div>

          <div className="form-group form-check w-25">
            <input
              name="acceptTerms"
              type="checkbox"
              {...register("acceptTerms")}
              className={`form-check-input ${
                errors.acceptTerms ? "is-invalid" : ""
              }`}
            />
            <label htmlFor="acceptTerms" className="form-check-label">
              I have read and agree to the Terms
            </label>
          </div>

          <div className="form-group w-25">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button
              type="button"
              onClick={reset}
              className="btn btn-warning float-right"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
