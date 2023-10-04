import React, { useEffect, useState } from 'react'
import './MusicPlayer.css';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Replay10Icon from '@mui/icons-material/Replay10';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Forward10Icon from '@mui/icons-material/Forward10';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { ContextProvider } from '../../utils/Provider';



function MusicPlayer() {

    const {playSong} = ContextProvider();
    const[play,setPlay]= useState(true);

    useEffect(()=>{
        // fetch(`https://academics.newtonschool.co/api/v1/music/album/${songUrl}`,{
        //     headers:{
        //         'projectId':'b8cjykmftj1r'
        //     }
        // })
        // .then((res)=>res.json())
        // .then((data)=>console.log(data));
        console.log(playSong)
    },[playSong.id])

    return (
    
        <div className='musicPlayerContainer'>
            <div className='musicLeft'>
                <img className='musicLogo' src={''} />
                <div className='musicDetails'>
                    {/* <h3>{data.title}</h3>
                    <p>{description}</p> */}
                </div>
            </div>
            <div className='musicMiddle'>
                <div className='musicPlayerIcons'>
                <SkipPreviousIcon style={{fontSize:'2rem',cursor: 'pointer'}}/>
                <Replay10Icon style={{fontSize:'2rem',cursor: 'pointer'}}/>
                {!true ? 
                <PlayArrowIcon style={{fontSize:'3rem',cursor: 'pointer'}} />
                : 
                <PauseIcon style={{fontSize:'3rem',cursor: 'pointer'}} />
                }
                <Forward10Icon style={{fontSize:'2rem',cursor: 'pointer'}}/>
                <SkipNextIcon style={{fontSize:'2rem',cursor: 'pointer'}}/>
                </div>
            </div>
            <div className='musicRight'>
                <VolumeUpIcon style={{fontSize:'2rem'}}/>
            </div>
        </div>
      )
}

export default MusicPlayer