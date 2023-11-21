import React,{useEffect, useState} from 'react'
import './MusicCard.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../utils/Provider';
import musicAnimation from '../../assets/musicAnimation.mp4';
import { useMusic } from '../../utils/MusicProvider';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function MusicCard({music,type,cardType}) {

    const {playSong,backColor,loggedInUser,setTryAmazonPopUp} = ContextProvider();
    const {musicStatus,musicId,musicDispatch} = useMusic();

    if(!music) return <h2 className='home text-red-400 m-4'>No Song Found!</h2>

    
    const{thumbnail,image,title,name,audio_url,_id,description}= music?music:{}; 
    const [hovered,setHovered]= useState(false);
    const nav= useNavigate();
    const [clicked,setClicked]= useState(false);

    const songName = name?.split(' ')?.slice(0,4).join(' ') || title?.split(' ')?.slice(0,4).join(' ');



      async function addFavFunction(){

        console.log(_id);
        const res= await fetch('https://academics.newtonschool.co/api/v1/music/favorites/like',{
          method:'PATCH',
          headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${decodeURIComponent(document.cookie)}`,
            'projectID': 'b8cjykmftj1r'
          },
          body:JSON.stringify({
            songId: _id
          })
        });
      const data= await res.json();
      
      console.log(data)
      if(data.status){
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      }
    } 

    function handlePlay(){
      if(cardType!=='song') return;
      if(musicStatus=='play') musicDispatch({type:'stop'});
      musicDispatch({type:'setMusicId',payload:_id})
      setClicked(true);
    }

    function handlePause(){
      musicDispatch({type:'pause'})
      setClicked(false);
    }

    function handleRedirect(){
      nav(`/${cardType}/${music._id}`);
    }


    const artists= music?.artist?.map((eArtist)=>{
      return eArtist.name;
    });

    const addIconFunc=()=>{
      if(loggedInUser.status){
        addFavFunction();
      }else{
        setTryAmazonPopUp(true)
      }
    }

    function handleOptions(){
      loggedInUser.status && toast.success('Feature Coming Soon', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      }) || setTryAmazonPopUp(true);
    }
    return (
      <div className={`musicCard ${backColor}Card`}>
        <div className="imgContainer" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
          <img src={thumbnail?thumbnail:image} className='mainImg' alt="" />
          {clicked && _id===musicId && <div className='absolute top-0 backdrop-blur-sm w-full h-full flex justify-center items-center'>
              <video className='w-10 h-10' src={musicAnimation} muted autoPlay loop />
            </div>}
          {hovered &&  _id!==musicId && <div className='playerIcons'>
          {
            cardType==='podcasts' || cardType==='artist'?
            <div className='artistAlbumIcon' onClick={()=>{ !loggedInUser.status ? setTryAmazonPopUp(true) : (cardType==='artist' || cardType=='podcasts' ? handleRedirect():null)}} >
              <ChevronRightIcon style={{fontSize:'2rem',color:'white'}} />
            </div> :
            <div className='songsIconContainer'>
             {
            cardType!=='album' ? <AddRoundedIcon onClick={()=>addIconFunc()} className='cursor-pointer' style={{fontSize:'2rem',color:'white'}}/>: <div style={{paddingRight:'1.4rem'}}></div> 
            }
            <div className="playPauseIcon">
            <PlayArrowIcon onClick={()=>{ !loggedInUser.status ? setTryAmazonPopUp(true) : handlePlay(); loggedInUser.status && cardType==='album' && handleRedirect() }} style={{fontSize:'3rem',color:'white'}}/>
            </div>
            <MoreHorizIcon onClick={handleOptions} className='cursor-pointer' style={{fontSize:'2rem',color:'white'}}/>
          </div>
          } 
          </div>
          }
        </div>

        <div className="musicDataContainer">
          <div className="name">{songName}</div>    
          <div className="artist">{artists? artists.slice(0,2)?.join(', ') : description?.split(' ').slice(0,3).join(' ')}</div>
        </div>
        <ToastContainer/>
      </div>
    )
}

