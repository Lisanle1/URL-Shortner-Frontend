import React ,{useState}from 'react'
import logo from '../../assests/images/Shortify.png'
import link_shorter from '../../assests/images/link_shorter.png'
import {NavLink} from 'react-router-dom'
import bg from "../../assests/images/bg-01.jpg";
import './Home.css'

function Home() {
    const [show,setShow]=useState(false)
    const handleShow=()=>{
        setShow(true) 
    }
  return (
    <> 
         {/* <!-- navbar  --> */}
    <nav className="navbar navbar-expand-lg navbar-light nav">
      <div className="container">
     
        <NavLink to='/' className="navbar-brand" >
          <img
            src={logo} 
            width="150"
            height="36"
            alt="Logo"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mt-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to='/' className="nav-link active" aria-current="page" >Home</NavLink>
            </li>      
            <li className="nav-item">
             <NavLink to="/login" className='nav-link active' aria-current="page" >Login</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/signup" className='nav-link active' aria-current="page" >Signup</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#features">Features</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {/* <!-- navbar end  --> */}

       <div
          className="container-login100"
          style={{ backgroundImage: `url(${bg})` }}
          >
    <div className="container py-3">

      <div className="row justify-content-center align-items-center">
        <div className="col-10 col-md-6 text-center">
        
          {show?
            <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
           Please login to shortify your URL!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>:<></>}
          <img 
            src={link_shorter}
            className="img-fluid logo-img"
            alt="Banner"
          />
          <h1 className='h-color'>Shorten Any URL</h1>
          <h2 className='h-color'>And Get deep Analytics from them !</h2> 

          <button className="btn btn-lg  mt-5 btn-color" onClick={handleShow}>Get Started</button>
        </div>
      </div>
    </div>

    <div id="features" className="container p-5"> 
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center g-3">
          <div className="col">
              <div className="card text-center h-100" >
                  <i style={{fontSize: "3em"}} className="bi bi-bar-chart-line"></i>
                  <div className="card-body">
                    <h3 className="card-title">Easy Analytics</h3>
                    <p className="card-text">Like with most marketing services, the more detailed and powerful these analytics.</p>
                  
                  </div>
                </div>
          </div>
          <div className="col">
              <div className="card text-center h-100" >
                  <i style={{fontSize: "3em"}} className="bi bi-cpu"></i>
                  <div className="card-body">
                    <h3 className="card-title">Fast And Powerful</h3>
                    <p className="card-text">Fast and Powerful shortify link will be provide with free of cost and efficent.</p>
                  
                  </div>
                </div>
          </div>
          <div className="col">
              <div className="card text-center h-100" >
                  <i  style={{fontSize: "3em"}} className="bi bi-megaphone"></i>
                  <div className="card-body">
                    <h3 className="card-title">Who Drives Traffic</h3>
                    <p className="card-text">Traffic activity platform with precise and details. Hassle free website.</p>
                  
                  </div>
                </div>
          </div>
          </div>
      </div>
  </div>
    </>
  )
}

export default Home