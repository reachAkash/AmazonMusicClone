import React from 'react'
import Button from '../Button/Button.jsx'
import CloseIcon from '@mui/icons-material/Close';
import './PopUp.css';
import { useParams } from 'react-router-dom';
import { ContextProvider } from '../../utils/Provider.jsx';
import { useNavigate } from 'react-router-dom';

function PopUp() {

    const {setTryAmazonPopUp}= ContextProvider();
    const nav= useNavigate();
    const {queryId}= useParams();

  return (
    <div className='overlay'>

        <div className="popUpModal">

            <div className="closeIconContainer" onClick={()=>{setTryAmazonPopUp(false); nav(-1)}}>
                <CloseIcon className='closeIcon'/>
            </div>

            <div className="textContent">
                <h2>Try Amazon Prime Music</h2>
                <p>Ad-free music streaming included with Prime membership. Also includes free shipping and video streaming.</p>
                <div className='modalBtns'>
                    <button className='modalBtn signInBtn' onClick={()=>{setTryAmazonPopUp(false);nav('/login')}}>Already a customer ? Login</button>
                    <button className='modalBtn signUpBtn' onClick={()=>{nav('/subscription');setTryAmazonPopUp(false)}}>Try now</button>
                </div>
            </div>
        </div>

        </div>
  )
}

export default PopUp