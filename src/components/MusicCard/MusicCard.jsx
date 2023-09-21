import React,{useState} from 'react'
import './MusicCard.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function MusicCard({music}) {

    const{thumbnail,image,artists,title}= music; 

    const[hovered,setHovered]= useState('');
    const[play,setPlay]= useState('');
    
  return (
    <div className='musicCard'>
            <div className="musicImageContainer">
                <img className='musicImage' src={thumbnail?thumbnail:image} alt="" />
                {hovered && <Hover/>}
                </div>
            <div className="musicDetails">
                <div className="name">{title}</div>
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