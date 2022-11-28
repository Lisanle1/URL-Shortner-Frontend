import React, { useEffect, useState } from 'react';
import DoughnutChart from '../utils/DoughnutChart';
import './dash.css'
import axios from 'axios';
import NavBar from '../../layouts/NavBar/NavBar';
import Footer from '../../layouts/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import bg from "../../assests/images/bg-01.jpg";

function Dashboard(){
    let navigate=useNavigate();  
  let [data,setData]=useState([]);
  let token=localStorage.getItem("token")
  useEffect(()=>{
      async function getData(){
        const decodedToken=jwt_decode(token);
        if(token && decodedToken.exp*1000 < Date.now()){
          return navigate('/')
              }
              else{    
        const res=await axios.get(`${process.env.REACT_APP_API_URL}/shortify`,{
            headers:{
                accesstoken: localStorage.getItem('token')
              }
            });
            setData(res.data)         
        }
    }getData();
  }, [token,navigate])

let noVisits=0,totalClicks=0,createdUrlsPerDay=0,createdUrlsPerMonth=0;

// to get total clicks and not visited links counts
data.forEach(el=>{
    if(el.clicks===0){
    noVisits++;
    }
    else{
        totalClicks+=el.clicks
    }
})

// to get date and month using toISOString method.
let todayDate=new Date().toISOString().slice(0,10); 
let thisMonth=new Date().toISOString().slice(0,7)

data.forEach(el=>{
let createdDate=el.created_At.slice(0,10)
let createdMonth=el.created_At.slice(0,7)
    if(createdDate===todayDate){   
        createdUrlsPerDay++;
    }
    if(createdMonth===thisMonth){
    createdUrlsPerMonth++;
    };
})

// to get data length for total url
const urlCount=data.length;

    return(
        <>
        <NavBar/>
    <div
          className="container-login100"
          style={{ backgroundImage: `url(${bg})` }}
          >
                <div className="container shadow ">
    <div className="container py-3"> 
      <h2 className="text-center mt-3 mb-3">URL Activity</h2>
      <div className="row row-cols-1 g-4 text-center">
              <div className="col">
                  <div className="container row justify-content-around">

                    <div className="col-12 col-md-4 col-lg-2 ">
                        <div className="card border-left-primary shadow textAlign">
                            <div className="d-flex flex-column justify-content-center align-item-center">
                                <p className='text'>
                                    Total <br />
                                    Clicks
                                </p>
                                <h3>
                                    {totalClicks}
                                    
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-2  ">
                    <div className="card border-left-primary shadow textAlign">
                            <div className="d-flex flex-column justify-content-center align-item-center">
                                <p className='text'>
                                     Total URL<br />
                             per day / month
                                </p>
                                <h4>
                                     {createdUrlsPerDay +"/"+ createdUrlsPerMonth}
                                </h4>
                            </div> 
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-2 ">
                    <div className="card border-left-primary shadow textAlign">
                            <div className="d-flex flex-column justify-content-center align-item-center">
                                <p className='text'>
                                    Total <br />
                                    Urls
                                </p>
                                <h2>
                                    {urlCount}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-2 ">
                    <div className="card border-left-primary shadow textAlign" >
                            <div className="d-flex flex-column justify-content-center align-item-center">
                                <p className='text'>
                                    Not visits <br />
                                    Count
                                </p>
                                <h2>
                                    {noVisits}
                                </h2>
                            </div>
                            
                        </div>
                    </div>
               

                
              </div>
              
              <div className="row justify-centent-center">
                  <div className="col-12 col-md-4 col-lg-4 mx-auto align-text"  >
                    <canvas className='d-flex flex-column justify-content-center align-item-center'></canvas>
                    <DoughnutChart data={{totalClicks,createdUrlsPerDay,createdUrlsPerMonth,urlCount,noVisits}}/>
                </div>
                 </div>
              </div>
              </div>

   

      </div>
               <Footer/>
    </div>
              </div>

        </>
    );
}
export default Dashboard;