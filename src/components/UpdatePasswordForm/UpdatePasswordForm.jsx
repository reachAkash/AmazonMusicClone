import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button/Button.jsx'
import './UpdatePasswordForm.css';
function UpdatePasswordForm() {

    const nav= useNavigate();

    function handleGoBack(e){
        e.preventDefault();
        nav(-1);
    }

  return (
    
    <div className='updateFormContainer'>
    <div className='updateForm'>
        <form className='formTop'>
            <h2>Update Password</h2>
            <div className='updatePasswordInputs'>
                <div className='userNameContainer'>
                    <label for='userName'>Username</label>
                    <input type='text' className='userNameInput'/>
                </div>
                <div className='userPasswordContainer'>
                    <label for='password'>Current Password</label>
                    <input type='password' className='userPasswordInput'/>
                </div>
                <div className='userNewPasswordContainer'>
                    <label for='password'>New Password</label>
                    <input type='password' className='userPasswordInput'/>
                </div>
                <div className='goBackUpdateForm'>
                    <Link  to={'..'}
                        onClick={(e) => handleGoBack(e)} className='goBackLink' >Go back</Link>
                </div>
            </div>
        </form>
        <div className='formBottom'>
          <Button style={{width:'100%', marginTop:'1rem', borderRadius:'5px',padding:'0.5rem'}}>Update Password</Button>
        </div>
    </div>
    </div>
  )
}

export default UpdatePasswordForm;