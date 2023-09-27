import React, { useEffect, useState } from 'react'
import './MusicPlayer.css';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Replay10Icon from '@mui/icons-material/Replay10';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Forward10Icon from '@mui/icons-material/Forward10';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';



function MusicPlayer({songUrl,currentSong,setCurrentSong,musicPlayed,setMusicPlayed}) {

    const[play,setPlay]= useState(true);

    useEffect(()=>{
        fetch(`https://academics.newtonschool.co/api/v1/music/album/${songUrl}`,{
            headers:{
                'projectId':'b8cjykmftj1r'
            }
        })
        .then((res)=>res.json())
        .then((data)=>console.log(data));
    },[])

  return (
      
    <div className='musicPlayerContainer'>
        <div className='musicLeft'>
            <img className='musicLogo' src={'https://th.bing.com/th/id/OIG.lVXjWwlHyIo4QdjnC1YE'} />
            <div className='musicDetails'>
                {/* <h3>{data.title}</h3>
                <p>{description}</p>
                <h3>data.title</h3>
                <p>description</p> */}
            </div>
        </div>
        <div className='musicMiddle'>
            <div className='musicPlayerIcons'>
            <SkipPreviousIcon style={{fontSize:'1.5rem',cursor: 'pointer'}}/>
            <Replay10Icon style={{fontSize:'1.5rem',cursor: 'pointer'}}/>
            <div className="playPauseIcon">
            {play ? 
            <PauseIcon style={{fontSize:'2rem',cursor: 'pointer'}} onClick={()=>setPlay(!play)}/>
            :
            <PlayArrowIcon style={{fontSize:'2rem',cursor: 'pointer'}} onClick={()=>setPlay(!play)}/>
        }
        </div>
            <Forward10Icon style={{fontSize:'1.5rem',cursor: 'pointer'}}/>
            <SkipNextIcon style={{fontSize:'1.5rem',cursor: 'pointer'}}/>
            </div>
        </div>
        <div className='musicRight'>
            <VolumeUpIcon style={{fontSize:'2rem'}}/>
        </div>
    </div>

  )
}

export default MusicPlayer