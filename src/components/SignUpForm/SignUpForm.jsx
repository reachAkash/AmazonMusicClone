import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button'
import './SignUpForm.css'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function SignUpForm() {

  const[userName,setUserName]= useState('');
  const[userEmail,setUserEmail]= useState('');
  const[userPassword,setUserPassword]= useState('');
  const nav= useNavigate();


 async function signUpUser(e){

    e.preventDefault();
    if(userPassword.trim()===''|| userEmail.trim()===''|| userPassword.trim()==='') {
      toast.error('Fill the empty fields', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    try { 
    const res= await fetch('https://academics.newtonschool.co/api/v1/user/signup',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'projectId': 'b8cjykmftj1r'
      },
      body: JSON.stringify({
        name:userName,
        email:userEmail,
        password:userPassword,
        appType: 'music'
      })
    });
    const data= await res.json();

    if(data.status==='fail'){
      toast.error(data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    document.cookie= data.token;
    toast.success("Sign Up Successful!", {
      position: toast.POSITION.TOP_CENTER
    });
    console.log(userName,userEmail,userPassword)
    setTimeout(()=>{
      nav('/');
    },1000)
  }
  catch(err){
    toast.error("Something went Wrong !", {
      position: toast.POSITION.TOP_CENTER
    });
  }
  }


  function redirectLogin(){
    nav('/login');
  }


  return (
    <div className='signUpFormContainer'>
    <div className='signUpForm'>
        <form className='signUpFormTop' onSubmit={signUpUser}>
            <h2>Sign In</h2>
            <div className='signUpUserNameForm'>
            <label for='userName'>Username</label>
            <input value={userName} onChange={(e)=>{
                setUserName(e.target.value)
                }} type='text' className='signUpUserNameInput' style={{marginBottom:0}} required/>
            </div>
            <div className='userEmailForm'>
            <label for='userName'>Email</label>
            <input value={userEmail} onChange={(e)=>{
                setUserEmail(e.target.value)
                }} type='text' className='signUpUserEmailInput' required/>
            </div>
            <div className='userPasswordForm'>
            <label for='password'> Password</label>
            <input value={userPassword} onChange={(e)=>{
                setUserPassword(e.target.value)
                }} type='password' className='signUpUserPasswordInput' required/>
            </div> 
            <Button className='updatePasswordSubmit' style={{ fontWeight:'bold', backgroundColor:'yellow',width:'100%', borderRadius:'5px',padding:'0.5rem'}}>Sign Up</Button>
            </form>
        <div className='signUpFormBottom'>
          <p>Already have a Account?</p>
          <Button className='updatePasswordSubmit' style={{fontWeight:'bold',backgroundColor:'lightseagreen',width:'100%',color:'white', marginTop:'1rem', borderRadius:'5px',padding:'0.5rem'}} onClick={redirectLogin}>Login</Button>
        </div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default SignUpForm