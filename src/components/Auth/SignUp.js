import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import bg from "../../assests/images/bg-01.jpg";
function SignUp() {
  let [show,setShow]=useState(false);
  const [status,setStatus]=useState("")
  const validateForm = (formData) => {
    const errors = {};
    if (formData.firstName === "") errors.firstName = "*First Name is Required";
    if (formData.lastName === "") errors.lastName = "*Last Name is Required";
    if (formData.email === "") errors.email = "*Email is Required";
    if (formData.password === "") errors.password = "*Password is Required";
    if (formData.confirmPassword === "")
      errors.confirmPassword = "*Confirm Password is Required";
    return errors;
  };
    let handleSubmit = async (values) => {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
        firstName:values.firstName,
        lastName:values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },{
        headers:{
          accesstoken:localStorage.getItem("token")
        }
      }
      )
      if(res){
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
                firstName:"",
                lastName:"",
                email: "",
                password: "",
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
              <span className="login100-form-title p-b-39">SignUp</span>
              <div className="wrap-input100">
                <span className="label-input100">First Name</span>
                <input
                  className="input100"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  placeholder="Enter your First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
              <span
                style={{
                        color: "red",
                        marginLeft: "13px",
                        fontSize: "15px",
                      }}
                    >
                      {touched.firstName && errors.firstName}
                    </span>
              <div className="wrap-input100 m-t-5">
                <span className="label-input100">Last Name</span>
                <input
                  className="input100"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  placeholder="Enter your Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
              <span
                      style={{
                        color: "red",
                        marginLeft: "13px",
                        fontSize: "15px",
                      }}
                    >
                      {touched.lastName && errors.lastName}
                    </span>
              <div className="wrap-input100 m-t-5">
                <span className="label-input100 ">Email</span>
                <input
                  className="input100"
                  type="text"
                  name="email"
                  value={values.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
               />
                <span className="focus-input100" data-symbol="&#9993;"></span>
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
              <div className="wrap-input100 m-t-5">
                <span className="label-input100 ">Password</span>
                <input
                  className="input100"
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="focus-input100" data-symbol="&#xf190;"></span>
              </div>
            
              <span
                      style={{
                        color: "red",
                        marginLeft: "13px",
                        fontSize: "15px",
                      }}
                    >
                      {touched.password && errors.password}
                    </span>
              <div className="wrap-input100 m-t-5">
                <span className="label-input100 ">Confirm Password</span>
                <input
                  className="input100"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  placeholder="Enter your confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="focus-input100" data-symbol="&#xf190;"></span>
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
                  {show && status===200?<button className="login100-form-btn" type="submit" style={{ backgroundColor: "grey" }} disabled={show}>signup</button>
                  :<button className="login100-form-btn" type="submit" disabled={isSubmitting}>signup</button>}
                </div>
              </div>

              <div className="flex-col-c p-t-35">
                <span className="txt1 p-b-7">
                  Or&nbsp;
                  <Link to="/login" className="txt1">
                    Sign In
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

export default SignUp;
