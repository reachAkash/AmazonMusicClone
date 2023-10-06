import React,{useEffect, useState} from 'react'
import './MusicCard.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import pauseImg from '../../assets/Song Pause.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../utils/Provider';

export default function MusicCard({music,type,cardType}) {

    const {playSong,backColor,loggedInUser,setTryAmazonPopUp} = ContextProvider();

    if(!music) return <h2 className='home text-red-400'>No Song Found!</h2>

    
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

    function handlePlay(){
      if(cardType!=='song') return;
      setClicked(!clicked);
      playSong.status='active';
      playSong.id= _id;
    }

    function handleRedirect(){
      nav(`/${cardType}/${music._id}`);
    }


    const artists= music?.artist?.map((eArtist)=>{
      return eArtist.name;
    });


    return (
      <div className={`musicCard ${backColor}Card`}>
        <div className="imgContainer" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
          <img src={thumbnail?thumbnail:image} className='mainImg' alt="" />
          {hovered && <div className='playerIcons'>
          {
            cardType==='podcasts' || cardType==='artist'? 
            <div className='artistAlbumIcon' onClick={()=>{ !loggedInUser.status ? setTryAmazonPopUp(true) : cardType==='artist' && handleRedirect(); cardType==='podcasts' && handleRedirect()}} >
              <ChevronRightIcon style={{fontSize:'2rem'}} />
            </div> :
            <div className='songsIconContainer'>
            {cardType!=='album' ? <AddRoundedIcon onClick={()=>loggedIn && addFavFunction() || setTryAmazonPopUp(true)} className='cursor-pointer' style={{fontSize:'2rem',color:'white'}}/>: <div style={{paddingRight:'1.4rem'}}></div> }
            <div className="playPauseIcon">
            {clicked ? <PauseIcon onClick={()=>handlePlay()} style={{fontSize:'3rem',color:'white'}} /> : <PlayArrowIcon onClick={()=>{ !loggedInUser.status ? setTryAmazonPopUp(true) : handlePlay(); loggedInUser.status && cardType==='album' && handleRedirect() }} style={{fontSize:'3rem',color:'white'}}/>}
            </div>
            <MoreHorizIcon className='cursor-pointer' style={{fontSize:'2rem',color:'white'}}/>
          </div>
          }
          </div>
          }
        </div>

        <div className="musicDataContainer">
          <div className="name">{songName}</div>    
          <div className="artist">{artists? artists.slice(0,2)?.join(', ') : description?.split(' ').slice(0,3).join(' ')}</div>
        </div>
      </div>
    )
}

