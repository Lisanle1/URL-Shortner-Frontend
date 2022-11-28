import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import bg from "../assests/images/bg-01.jpg";

function VerifyEmail() {
  const [queryToken] = useSearchParams();
  const token = queryToken.get("tk");
  useEffect(() => {
    async function getVerifyEmail() {
      const res=await axios.get(
        `${process.env.REACT_APP_API_URL}/users/verify-email?tk=${token}`
      );
      if(res.data.statusCode===200){
      setTimeout(()=>{
        alert(res.data.message)
      },2000)
      }
      else{
        setTimeout(()=>{
          alert(res.data.message)
        },8000)
      }
    }
    getVerifyEmail();
  }, [token]);
  return (
    <>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-35 p-b-64 m-b-20">
            <h2 className="wrap-login100 m-l-40">
              Email Verified Successfully
            </h2>
            <span className="wrap-login100 m-l-152">
              <i
                style={{ height: "5em", width: "4em" }}
                className="fas fa-check-circle"
              ></i>
            </span>
            <br />
            <span className="wrap-login100  m-l-118">
              <strong>you can login now</strong>
            </span>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;
