import React,{useEffect, useState} from 'react'
import './MusicCard.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import pauseImg from '../../assets/Song Pause.png';
import { useNavigate } from 'react-router-dom';

export default function MusicCard({music,type}) {
   
    const{thumbnail,image,title,name,audio_url,id}= music; 
    const [hovered,setHovered]= useState(false);
    const [clicked,setClicked]= useState(false);
    const nav= useNavigate();

    const songName = name?.split(' ')?.slice(0,4).join(' ') || title?.split(' ')?.slice(0,4).join(' ');

    function handleArtistRedirect(){
      nav(`/artist/${music._id}`);
    }
    
    const artists= type=='album'?(music?.artists?.map((eArtist)=>{
      return eArtist.name;
    })):(music?.artist?.map((eArtist)=>{
      return eArtist.name;
    }));


    return (
      <div className="musicCard">
        <div className="imgContainer" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
          <img src={thumbnail?thumbnail:image} className='mainImg' alt="" />
          {hovered && <div className='playerIcons'>
            <AddRoundedIcon style={{fontSize:'2rem'}}/>
            <div className="playPauseIcon">
            {clicked ? <PauseIcon onClick={()=>setClicked(!clicked)} style={{fontSize:'3rem'}} /> :<PlayArrowIcon onClick={()=>{setClicked(!clicked); type==='artist' && handleArtistRedirect()}} style={{fontSize:'3rem'}}/>}
            </div>
            <MoreHorizIcon style={{fontSize:'2rem'}}/>
          </div>}
        </div>

        <div className="musicDataContainer">
          <div className="name">{songName}</div>    
          <div className="artist">{artists?.slice(0,3)?.join(', ')}</div>
        </div>
      </div>
    )
}

