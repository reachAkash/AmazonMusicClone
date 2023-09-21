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
        <form className='formTop'>
            <h2>Login</h2>
            <div className='userNameForm marginBottom'>
            <label for='userName'>Email</label>
            <input value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} type='text' className='userNameInput'/>
            </div>
            <div className='userPasswordForm'>
                <div className='passwordTop'>
                    <label for='password'>Password</label>
                    <Link to='/update'>Update Password</Link>
                </div>
            <input value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} type='password' className='userPasswordInput'/>
            </div>
            {status && <p>{status.desciption}</p>}
            <Button style={{backgroundColor:'yellow',padding:'0.5rem' ,border:'none',borderRadius:'8px' ,color:'black', width:'100%' , textAlign:'center', cursor:'pointer', marginTop:'1rem'}}>Login</Button> 
        </form>
        <div className='formMiddle loginFormMiddle'>
        <div className='checkbox'>
                <input type='checkbox' />
                <p>Keep me signed in</p>    
        </div>
        </div>
        <div className='formBottom'>
          <p>Don't have a Account?</p>
          <Button style={{width:'100%', marginTop:'1rem', borderRadius:'5px',padding:'0.5rem'}}>Sign Up</Button>
        </div>
    </div>
    </div>
 
  )
}

export default LoginForm