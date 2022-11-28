import React, {useState} from "react";
import { Formik } from "formik";
import bg from "../../assests/images/bg-01.jpg";
import axios from "axios";
import {useParams,useSearchParams} from 'react-router-dom';
function ResetPassword() {
  const params=useParams();
  const [queryToken]=useSearchParams();
  const token=queryToken.get('tk')
  let [show, setShow] = useState(false);
  let [status, setStatus] = useState("");
  const validateForm = (formData) => {
    const errors = {};
    if (formData.newPassword === "")
      errors.newPassword = "*New Password is Required";
    if (formData.confirmPassword === "")
      errors.confirmPassword = "*Confirm Password is Required";
    return errors;
  };
  const handleSubmit=async(values)=>{
      const res= await axios.post(`${process.env.REACT_APP_API_URL}/users/resetpassword/${params.id}?tk=${token}`,{
        newPassword:values.newPassword,
        confirmPassword:values.confirmPassword
      },
      {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      }
    );
    if (res) {
      setStatus(res.data.statusCode);
        setShow(true);
        alert(res.data.message)
      } else {
        alert('Error while Resetting please! try again after some time.')
      }
  }
  return (
    <>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-35 p-b-64">
            <Formik
              initialValues={{
                newPassword: "",
                confirmPassword: "",
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
                isSubmitting
              }) => (
                <form className="login100-form" onSubmit={handleSubmit}>
                  <span className="login100-form-title p-b-29">
                    Reset Password
                  </span>
                  <div className="wrap-input100 ">
                    <span className="label-input100">New Password</span>
                    <input
                      className="input100"
                      type="password"
                      name="newPassword"
                      placeholder="Enter your New Password"
                      value={values.newPassword}
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
                      {touched.newPassword && errors.newPassword}
                    </span>
                  <br />

                  <div className="wrap-input100 m-t-5">
                    <span className="label-input100 ">Confirm Password</span>
                    <input
                      className="input100"
                      type="password"
                      name="confirmPassword"
                      placeholder="Enter your Confirm Password"
                      value={values.confirmPassword}
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
                        fontSize: "15px",
                      }}
                    >
                      {touched.confirmPassword && errors.confirmPassword}
                    </span>
                <br />
              <br />
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      {show && status===200 ? (
                      <button
                        className="login100-form-btn"
                        type="submit"
                        style={{ backgroundColor: "grey" }}
                        disabled={show}
                      >
                        reset
                      </button>
                    ) : (
                      <button
                        className="login100-form-btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        reset
                      </button>
                    )}{" "}
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
