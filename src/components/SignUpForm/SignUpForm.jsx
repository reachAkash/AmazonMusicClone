import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUpForm() {

  const[userName,setUserName]= useState('');
  const[userEmail,setUserEmail]= useState('');
  const[userPassword,setUserPassword]= useState('');
  const[status,setStatus]= useState('');
  const nav= useNavigate();


  function redirectLogin(){
    console.log('hi im inside login form')
    nav('/login');
  }


  return (
    <div className='signUpFormContainer'>
    <div className='signUpForm'>
        <form className='formTop'>
            <h2>Sign In</h2>
            <div className='userNameForm'>
            <label for='userName'>Username</label>
            <input value={userName} onChange={(e)=>{
                setUserName(e.target.value)
                }} type='text' className='userNameInput signUpUsername' style={{marginBottom:0}}/>
            </div>
            <div className='userEmailForm'>
            <label for='userName'>Email</label>
            <input value={userEmail} onChange={(e)=>{
                setUserEmail(e.target.value)
                }} type='text' className='userEmailInput'/>
            </div>
            <div className='userPasswordForm'>
            <label for='password'> Password</label>
            <input value={userPassword} onChange={(e)=>{
                setUserPassword(e.target.value)
                }} type='password' className='userPasswordInput'/>
            </div>
            {status.status=='fail' && <p style={{fontSize:'1rem',color:'red '}}>{status.message}</p>}   
            <button >Sign Up</button> 
            </form>
        <div className='formMiddle'> 
          <div className='termsAndConditions'>
              <p>By continuing, you agree to Amazon's <a href='#'>Conditions of Use</a> and <a>Privacy Notice.</a> </p>
          </div>
          <div className='checkbox'>
                  <input type='checkbox' />
                  <p>Keep me signed in</p>
                  <a href='#'>Details</a>
          </div>
        </div> 
        <div className='formBottom signUpFormBottom'>
          <p>Already have a Account?</p>
          <button className='loginBtn'>Login</button>
        </div>
    </div>
    </div>
  )
}

export default SignUpForm