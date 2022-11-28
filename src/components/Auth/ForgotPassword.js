import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import bg from "../../assests/images/bg-01.jpg";
import axios from "axios";
function ForgotPassword() {
  let [show, setShow] = useState(false);
  let [status, setStatus] = useState("");
  const validateForm = (formData) => {
    const errors = {};
    if (formData.email === "") errors.email = "*Email is Required";
    return errors;
  };
    let handleSubmit = async (values) => {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/forgotpassword`, {
        email: values.email,
      });
      if (res) {
        setStatus(res.data.statusCode);
        setShow(true);
        alert(res.data.message)
      } else {
        alert('Error while signup please! try again after some time.')
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
                email: ""    
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
                  <span className="login100-form-title p-b-19">
                    Forgot Password
                  </span>
                  <span style={{marginLeft:"10px"}}>Please check your email to reset your password</span>
                  <br />
                  <br />
                  <div className="wrap-input100">
                    <span className="label-input100">Email</span>
                    <input
                      className="input100"
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      value={values.email}
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
                        fontSize: "15px",
                      }}
                    >
                      {touched.email && errors.email}
                    </span>
                 <br/><br/>
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      {show && status===200 ?(<button className="login100-form-btn" type='submit' style={{backgroundColor:"grey"}} disabled={show}>
                      Send Link
                      </button>)
                      :(<button className="login100-form-btn" type='submit' disabled={isSubmitting}>
                        Send Link
                      </button>)}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
