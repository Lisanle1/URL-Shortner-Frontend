import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import bg from "../../assests/images/bg-01.jpg";
import axios from "axios";

function Login() {
  const navigate=useNavigate();
    const validateForm = (formData) => {
        const errors = {};
        if (formData.email === "") errors.email = "*Email is Required";
        if (formData.password === "") errors.password = "*Password is Required";
        return errors;
      };
      let handleSubmit = async (values) => {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
          email: values.email,
          password: values.password,
        });
        if (res.data.statusCode === 400) {
          alert(res.data.message);
        } else {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        }
      };
  return (
    <>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-44">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(formData) => validateForm(formData)}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form className="login100-form" onSubmit={handleSubmit}>
                  <span className="login100-form-title p-b-49">Login</span>

                  <div className="wrap-input100 ">
                    <span className="label-input100">Email</span>
                    <input
                      className="input100"
                      type="text"
                      name="email"
                      value={values.email}
                      placeholder="Enter your email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#9993;"
                    ></span>
                  </div>
                  <span
                      style={{
                        color: "red",
                        marginLeft: "13px",
                        fontSize: "16px",
                      }}
                    >
                      {touched.email && errors.email}
                    </span>
                  
                  <div className="wrap-input100 m-t-5">
                    <span className="label-input100">Password</span>
                    <input
                      className="input100"
                      type="password"
                      name="password"
                      value={values.password}
                      placeholder="Enter your password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#xf190;"
                    ></span>
                  </div>
                  <span
                      style={{
                        color: "red",
                        marginLeft: "13px",
                        fontSize: "16px",
                      }}
                    >
                      {touched.password && errors.password}
                   </span>               
                  <div className="text-right p-t-8 p-b-31">
                    <Link to="/forgotpassword">Forgot password?</Link>
                  </div>
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      <button className="login100-form-btn" type="submit">Login</button>
                    </div>
                  </div>

                  <div className="flex-col-c p-t-25">
                    <span className="txt1 p-b-17">
                      Don't have an account?&nbsp;
                      <Link to="/signup" className="txt1">
                        Sign Up
                      </Link>
                    </span>
                  </div>
                </form>
              )}
            </Formik>          
          <h6><strong>DemoMail: </strong> xaxoj79684@kixotic.com    <strong>Pass: </strong>admin</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
