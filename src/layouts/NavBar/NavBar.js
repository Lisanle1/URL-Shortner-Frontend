import React from 'react'
import './NavBar.css'
import logo from '../../assests/images/Shortify.png'
import {NavLink, useNavigate} from 'react-router-dom'
function NavBar() {
  const navigate=useNavigate();
  let handleLogOut=()=>{
    localStorage.removeItem('token');
    navigate('/')
  }
  return ( 
    <>
        {/* <!-- navbar  --> */}
  <nav className="navbar navbar-expand-lg navbar-light nav">
    <div className="container">
    <NavLink to='/' className="navbar-brand logo-align" >
          <img
            src={logo}
            width="150"
            height="36"
            alt="Logo"
          />
        </NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">

        <ul className="navbar-nav ms-auto mt-2 mb-lg-0 nav-align">
          <li className="nav-item">
            <NavLink to='/dashboard' className="nav-link active " aria-current="page" >Dashboard</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/shorturl' className="nav-link active" aria-current="page" >Shortify</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/urllink' className="nav-link active" aria-current="page" >MyUrls</NavLink>
          </li>
            <li className="nav-item">
              <p className="nav-link active" aria-current="page" onClick={handleLogOut} style={{cursor:"pointer"}}>Logout</p>
            </li>          
        </ul>
      </div>
    </div>
  </nav>
  {/* <!-- navbar end  --> */}
    </>
  )
}

export default NavBar