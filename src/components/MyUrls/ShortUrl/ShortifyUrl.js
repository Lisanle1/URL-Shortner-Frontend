import React ,{useState,useEffect}from "react";
import NavBar from "../../../layouts/NavBar/NavBar";
import "./ShortifyUrl.css";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import bg from "../../../assests/images/bg-01.jpg";
import Footer from "../../../layouts/Footer/Footer";

function ShortifyUrl() {
  const navigate=useNavigate();
  let [data,setData]=useState([]);
  let url=data[data.length-1] // to get last created url
  let[show,setShow]=useState(false)
  let [urlData,setUrlData]=useState({
    orgUrl:"",
    error:{
      orgUrl:"",
    }
  });
  let token=localStorage.getItem("token");
   useEffect(()=>{
      const decodedToken=jwt_decode(token);
      if(decodedToken.exp * 1000 < Date.now()){
       return navigate('/')
      }
     
  }, [token,navigate]);
  
  const handleChange=(e)=>{
    let error={...urlData.error};
    if(e.target.value===""){
      error[e.target.name]=`*${e.target.name} is Required`;
    }else{
      error[e.target.name]="";
    }
    setUrlData({...urlData,[e.target.name]: e.target.value, error})
  }
  let handleSubmit=async(e)=>{
    e.preventDefault();
    const errKeys=Object.keys(urlData).filter((key)=>{
      if(urlData[key]==="" && key !=="error"){
      return key;
      }
    });
    if(errKeys.length>=1){
      alert('Long URL is required');
    }
    else{
    await axios.post(`${process.env.REACT_APP_API_URL}/shortify/addurl`,
    {
      orgUrl:urlData.orgUrl,
    },
    {
      headers: {
        accesstoken: localStorage.getItem('token')
      },
    },
    ) 

const res=await axios.get(`${process.env.REACT_APP_API_URL}/shortify`,{
  headers:{
    accesstoken: localStorage.getItem('token')
  }
});
setShow(true)
setData(res.data) 
}
  }
  const handleCopy=()=>{
    alert('Copied!')
  }
  return (
    <>
      <NavBar />
      <div
          className="container-login100"
          style={{ backgroundImage: `url(${bg})` }}
          >
      <div className="container">
      <div className="container shadow p-4">

        <span className="heading">
          <h4>
            <strong>Drop your url to shortify</strong>
          </h4>
          <br />
          <h5 className="heading1">
            Try Shortify Links for free. Paste your URL to create a shortened
            link then copy your link.
          </h5>
        </span>
        <div className="col">
          <div className="col-12 col-md-4 col-lg-8 p-5 mx-auto ">
            <form onSubmit={(e)=>handleSubmit(e)}>
              <div className="mb-3 align">
                <label htmlFor="url">Destination</label>
                <input
                  id="orgUrl"
                  value={urlData.orgUrl}
                  name="orgUrl"
                  type="text"
                  className="form-control"
                  placeholder="Paste Your URL"
                  onChange={(e)=>handleChange(e)} 
                />
                <span className="error-message">{urlData.error.orgUrl}</span>
                
              </div>
              { show ?
              <div className="mb-3 align">
                <label htmlFor="url">Shortify Url</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    value={url.shortUrl}
                    className="form-control"
                    placeholder="Get your url....."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={(e)=>handleChange(e)}
                  />
                  <div className="input-group-append">
                  <CopyToClipboard text={url.shortUrl}>
                    <button type="button" className="btn btn-success " onClick={(e)=>handleCopy(e)}>
                      <i className="fa-solid fa-copy"></i> Copy
                    </button>
                    </CopyToClipboard>
                    <br />
                  </div>
                </div>
              </div>:<></>}
              <div className="mb-3 align">
                <button className="btn btn-primary mt-3 align"  type="submit">
                    
                    Make Shortify
                  </button>
                  </div> 
            </form>
          </div>
          </div>
        </div>
      <Footer />
        </div>
      </div>
    </>
  );
}

export default ShortifyUrl;
