import React,{useState} from 'react'
import './MusicCard.css';


function MusicCard() {

    const[hovered,setHovered]= useState('');
const[play,setPlay]= useState('');


  return (
    <div className='musicCard'>
            <div className="musicImageContainer">
                <img className='musicImage' src="https://wp.dailybruin.com/images/2023/09/web.ae_.guts_.review.courtesy.jpg" alt="" />
                {hovered && <Hover/>}
                </div>
            <div className="musicDetails">
                <div className="name">Akash Song</div>
                <div className="artist">Akash Artist</div>
            </div>
    </div>
  )
}


function Hover(){

    return <div className='imageCover'>
       {
       play ? 
       <>
       <AddRoundedIcon/>
        <PlayCircleOutlineIcon/>
        <MoreHorizIcon/>
       </>
        : '...' 
    }
    </div>
}
export default MusicCard