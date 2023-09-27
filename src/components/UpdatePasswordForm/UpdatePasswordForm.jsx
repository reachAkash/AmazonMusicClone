import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '../Button/Button.jsx'
import './UpdatePasswordForm.css';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function UpdatePasswordForm() {

    const[userName,setUserName]= useState('');
    const[userEmail,setUserEmail]= useState('');
    const[userOldPassword,setUserOldPassword]= useState('');
    const[userNewPassword,setUserNewPassword]= useState('');
    const nav= useNavigate();

    function handleGoBack(e){
        e.preventDefault();
        nav(-1);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const res= await fetch('https://academics.newtonschool.co/api/v1/user/updateMyPassword',{
            method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'projectId': 'b8cjykmftj1r'
                },
                body: JSON.stringify({
                    name: userName,
                    email: userEmail,
                    passwordCurrent: userOldPassword,
                    password: userNewPassword,
                    appType: 'music',
                })
        })
        const data= await res.json();
        console.log(data);  
    }

  return (
    
    <div className='updateFormContainer'>

    <div className='updatePassForm'>
        <form className='updatePassFormTop' onSubmit={handleSubmit}>
            <h2>Update Password</h2>
            <div className='updatePasswordInputs'>
                <div className='userNameContainer'>
                    <label for='userName'>Username</label>
                    <input type='text' value={userName} onChange={(e)=>setUserName(e.target.value)} className='userNameInput' required/>
                </div>
                <div className="userNameContainer">
                    <label for='userName'>Email</label>
                    <input value={userEmail} onChange={(e)=>{
                    setUserEmail(e.target.value)
                    }} type='text' className='userNameInput' required/>
                </div>
                <div className='userPasswordContainer'>
                    <label for='password'>Current Password</label>
                    <input type='password' value={userOldPassword} onChange={(e)=>setUserOldPassword(e.target.value)} className='userPasswordInput' required/>
                </div>
                <div className='userNewPasswordContainer'>
                    <label for='password'>New Password</label>
                    <input type='password' value={userNewPassword} onChange={(e)=>setUserNewPassword(e.target.value)} className='userPasswordInput' required/>
                </div>
            </div>
        </form>
        <div className='formBottom'>
        <div className='goBackUpdateForm'>
                    <Link  to={'..'}
                        onClick={(e) => handleGoBack(e)} className='goBackLink' >Go back</Link>
                </div>
          <Button className='updatePasswordSubmit' onClick={handleSubmit} style={{backgroundColor:'yellow',width:'90%', marginTop:'1rem', borderRadius:'5px',padding:'0.5rem'}}>Update Password</Button>
        </div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default UpdatePasswordForm;