import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './LoginForm.css'
import Button from '../Button/Button';
function LoginForm() {

    const[userEmail,setUserEmail]= useState('');
    const[userPassword,setUserPassword]= useState('');
    const[status,setStatus]= useState('');

  return (
    <div className='loginFormContainer'>
    <div className='loginForm'>
        <form className='loginFormTop'>
            <h2>Login</h2>
            <div className='loginUserNameForm'> 
            <label for='userName'>Email</label>
            <input value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} type='text' className='loginUserNameInput'/>
            </div>
            <div className='loginUserPasswordForm'>
                <div className='loginPasswordTop'>
                    <label for='password'>Password</label>
                    <Link className='updatePassLink' to='/update'>Update Password</Link>
                </div>
            <input value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} type='password' className='userPasswordInput'/>
            </div>
            {status && <p>{status}</p>}
            <Button style={{backgroundColor:'yellow',padding:'0.5rem' ,border:'none',borderRadius:'8px' ,color:'black', width:'100%' , textAlign:'center', cursor:'pointer', marginTop:'1rem'}}>Login</Button> 
        </form>
        <div className='loginFormMiddle'>
        <div className='checkbox'>
                <input type='checkbox' />
                <p>Keep me signed in</p>    
        </div>
        </div>
        <div className='loginFormBottom'>
          <p>Don't have a Account?</p>
          <Button style={{backgroundColor:'lightseagreen',width:'100%', marginTop:'1rem', borderRadius:'5px',padding:'0.5rem',color:'white',fontWeight:'bold'}}>Sign Up</Button>
        </div>
    </div>
    </div>
 
  )
}

export default LoginForm
