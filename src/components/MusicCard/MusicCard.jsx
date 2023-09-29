import React,{useEffect, useState} from 'react'
import './MusicCard.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import pauseImg from '../../assets/Song Pause.png';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../utils/Provider';

export default function MusicCard({music,type,cardType}) {

    const {backColor} = ContextProvider();
    if(!music) return <h2 className='home'>No Song Found!</h2>
    const{thumbnail,image,title,name,audio_url,_id,description}= music?music:{}; 
    const[clicked,setClicked]= useState(false);
    const [hovered,setHovered]= useState(false);
    const nav= useNavigate();
    let audioUrl;
    const songName = name?.split(' ')?.slice(0,4).join(' ') || title?.split(' ')?.slice(0,4).join(' ');

    async function addFavFunction(){
      console.log(_id)
      const res= await fetch('https://academics.newtonschool.co/api/v1/music/favorites/like',{
        method:'PATCH',
        headers:{
          'Authorization':`Bearer ${decodeURIComponent(document.cookie)}`,
          'projectId': 'b8cjykmftj1r'
        },
        body:JSON.stringify({
          "songId": _id,
        })
      });
      const data= await res.json();
      console.log(data)
    }

    function handleArtistRedirect(){
      // console.log(music)
      nav(`/type/${cardType}/query/${music._id}`);
    }

    function handleAlbumRedirect(){
      nav(`/type/${cardType}/query/${music._id}`);
    }

    if(title==='Jana Gana Mana'|| name==='Jana Gana Mana') return null;

    const artists= music?.artist?.map((eArtist)=>{
      return eArtist.name;
    });

    return (
      <div className={`musicCard ${backColor}Card`}>
        <div className="imgContainer" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
          <img src={thumbnail?thumbnail:image} className='mainImg' alt="" />
          {hovered && <div className='playerIcons'>
           {cardType!=='album' && cardType!=='artist' ? <AddRoundedIcon onClick={addFavFunction} className='cursor-pointer' style={{fontSize:'2rem',color:'white'}}/>: <div style={{paddingRight:'1.4rem'}}></div> }
            <div className="playPauseIcon">
            {clicked ? <PauseIcon onClick={()=>setClicked(!clicked)} style={{fontSize:'3rem',color:'white'}} /> : <PlayArrowIcon onClick={()=>{setClicked(!clicked);  ; cardType==='artist' && handleArtistRedirect(); cardType==='album' && handleAlbumRedirect() }} style={{fontSize:'3rem',color:'white'}}/>}
            </div>
            <MoreHorizIcon className='cursor-pointer' style={{fontSize:'2rem',color:'white'}}/>
          </div>}
        </div>

        <div className="musicDataContainer">
          <div className="name">{songName}</div>    
          <div className="artist">{artists? artists.slice(0,2)?.join(', ') : description?.split(' ').slice(0,3).join(' ')}</div>
        </div>
      </div>
    )
}

