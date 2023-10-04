import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import './Explicit.css';
import { useNavigate } from 'react-router-dom';
function Explicit() {
    const nav= useNavigate();
    function goBack(){
        nav(-1);
    }
    const BtnStyle1={
        backgroundColor:'aqua',
        width: '7rem',
        color:'black',
        borderRadius:'20px',
        // border:'2px solid white'
    }
    const BtnStyle2={
        width: '7rem',
        color:'white',
        borderRadius:'20px',
        border:'2px solid aqua'
    }
  return (
    <div className='explicitContainer'>
        <div className="explicitContainerForm">

        <div className="explicitTop">
            <div className="explicitCloseIcon" style={{cursor:'pointer'}}>
                <CloseIcon onClick={goBack} />
            </div>
        </div>
        <div className="explicitBottom">
            <h3>Block Explicit Songs</h3>
            <h4>Songs with explicit language will be blocked on all your browsers.</h4>
            <div className="explicitButtons">
                <Button className='buttonExplicit' style={BtnStyle2} onClick={goBack}>DISMISS</Button>
                <Button  style={BtnStyle1} onClick={goBack}>BLOCK</Button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Explicit