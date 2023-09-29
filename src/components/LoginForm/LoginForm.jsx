import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './LoginForm.css'
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from '../../utils/Provider';

function LoginForm() {

    const[userEmail,setUserEmail]= useState('');
    const[userPassword,setUserPassword]= useState('');
    const nav= useNavigate();
    const{setLoggedIn}= ContextProvider();

    function redirectSignUp(){
      nav('/signup');
    }

   async function loginUser(e){
      e.preventDefault();
    try{
      const res= await fetch('https://academics.newtonschool.co/api/v1/user/login',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'projectId': 'b8cjykmftj1r' 
        },
        body: JSON.stringify({
          email:userEmail,
          password:userPassword,
          appType: 'music'
        })
      });
      const data= await res.json();
      console.log(data);
      document.cookie= data.token;
      if(data.status=='fail'){
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER
        });
        return ;
      }
      toast.success("Login Successful!", {
        position: toast.POSITION.TOP_CENTER
      });
      setLoggedIn(true);
      
      setTimeout(()=>{
        nav('/');
      },1000)
    }
    catch(err){
      toast.error("Something Went Wrong!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    }

  return (
    <div className='loginFormContainer'>
    <div className='loginForm'>
        <form className='loginFormTop' onSubmit={loginUser}>
            <h2>Login</h2>
            <div className='loginUserNameForm'> 
            <label for='userName'>Email</label>
            <input value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} type='email' className='loginUserNameInput' required />
            </div>
            <div className='loginUserPasswordForm'>
                <div className='loginPasswordTop'>
                    <label for='password'>Password</label>
                    <Link className='updatePassLink' to='/update'>Update Password</Link>
                </div>
            <input value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} type='password' className='userPasswordInput' required/>
            </div>
            <Button style={{backgroundColor:'yellow',padding:'0.5rem' ,border:'none',borderRadius:'8px' ,color:'black', width:'100%' ,fontWeight:'bold', textAlign:'center', cursor:'pointer', marginTop:'1rem'}}>Login</Button> 
        </form>
        <div className='loginFormMiddle'>
        <div className='checkbox'>
                <input type='checkbox' />
                <p>Keep me signed in</p>    
        </div>
        </div>
        <div className='loginFormBottom'>
          <p>Don't have a Account?</p>
          <Button style={{backgroundColor:'lightseagreen',width:'100%', marginTop:'1rem', borderRadius:'5px',padding:'0.5rem',color:'white',fontWeight:'bold'}} onClick={redirectSignUp}>Sign Up</Button>
        </div>
    </div>
    <ToastContainer/>
    </div>
 
  )
}

export default LoginForm
