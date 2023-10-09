import React, { useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import './LoginForm.css'
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from '../../utils/Provider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function LoginForm() {

    const[userEmail,setUserEmail]= useState('');
    const[userPassword,setUserPassword]= useState('');
    const nav= useNavigate();
    const{setLoggedInUser}= ContextProvider();
    const [passVisible,setPassVisible]= useState(false);
    const inputRef= useRef();

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
          position: toast.POSITION.TOP_CENTER,
          autoClose:1500
        });
        return ;
      }
      toast.success("Login Successful!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose:1500
      });
      console.log(data);
      setLoggedInUser({
        status:true,
        name:data.data.name
      });
          
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

    function changeInputType(){
      if(passVisible){
        inputRef.current.type='password';
        setPassVisible(false);
      } 
      else{
        inputRef.current.type='text';
        setPassVisible(true);
      } 
    }

  return (
    <div className='loginFormContainer'>
    <div className='loginForm'>
        <form className='loginFormTop' onSubmit={loginUser}>
            <h2>Login</h2>
            <div className='loginUserNameForm'> 
            <label htmlFor='userName'>Email</label>
            <input value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} type='email' className='loginUserNameInput' required />
            </div>
            <div className='loginUserPasswordForm'>
                <div className='loginPasswordTop'>
                    <label htmlFor='password'>Password</label>
                    <Link className='updatePassLink' to='/update'>Update Password</Link>
                </div>
                <div className="loginInputDiv">
                    <input ref={inputRef} value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} className='userPasswordInput' type='password'required/>
                    {passVisible && <VisibilityOffIcon onClick={changeInputType} style={{cursor:'pointer',color:'gray', position:'absolute',right:0,paddingRight:'0.5rem',fontSize:'2rem'}}/> || <VisibilityIcon onClick={changeInputType} style={{cursor:'pointer',color:'gray',position:'absolute',right:0,paddingRight:'0.5rem',fontSize:'2rem'}} />}
                </div>

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
