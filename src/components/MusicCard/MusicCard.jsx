import React,{useState} from 'react'
import './MusicCard.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function MusicCard({music}) {
    // const 
    const{thumbnail,image,title,name}= music; 
    
    const[hovered,setHovered]= useState(true);
    const[play,setPlay]= useState(false);
    
    // console.log(music)
  return (
    <div className='musicCard'>
            <div className="musicImageContainer">
                <img className='musicImage' src={thumbnail?thumbnail:image} alt="" />
                {hovered && <Hover play={play} />}
                </div>
            <div className="musicDetails">
                <div className="name">{title?title:name}</div>
                {/* { && <div className="artist">{}</div>}
                { && <div className="artist">{}</div>} */}
            </div>
    </div>
  )
}


function Hover({play}){

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