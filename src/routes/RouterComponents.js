import React from 'react'
import Login from '../components/Auth/Login'
import {Routes,Route} from 'react-router-dom'
import SignUp from '../components/Auth/SignUp';
import ForgotPassword from '../components/Auth/ForgotPassword';
import ResetPassword from '../components/Auth/ResetPassword';
import Dashboard from '../components/Dashboard/Dashboard';
import VerifyEmail from '../pages/VerifyEmail';
import Home from '../components/Home/Home';
import UrlLinks from '../components/MyUrls/UrlLinks/UrlLinks';
import ShortifyUrl from '../components/MyUrls/ShortUrl/ShortifyUrl';
function RouterComponents() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/> 
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/resetpassword/:id' element={<ResetPassword/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/verify-email' element={<VerifyEmail/>}/>
            <Route path='/urllink' element={<UrlLinks/>}/>
            <Route path='/shorturl' element={<ShortifyUrl/>}/>
        </Routes>
    </div>
  )
}

export default RouterComponents;