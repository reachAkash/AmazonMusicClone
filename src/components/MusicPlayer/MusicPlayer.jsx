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
import { useMusic } from '../../utils/MusicProvider';
import { project_ID } from '../../utils/Constants';
import useSound from 'use-sound';



function MusicPlayer() {

    const defaultAudio= 'https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf934147ae38c3e33a509d.mp3';
    const {musicId,musicStatus,musicDispatch}= useMusic();
    const[music,setMusic]= useState();
    const[audioUrl,setAudioUrl]= useState(defaultAudio);
    const[play,{pause,duration}]= useSound(audioUrl,{
        volume:1,
    });

    useEffect(()=>{
        if(musicId){
            console.log(musicId);
            musicDispatch({type:'pause'});
            stop();
            setAudioUrl(defaultAudio);
        }
        fetch(`https://academics.newtonschool.co/api/v1/music/song/${musicId}`,{
            headers:{
                projectId:project_ID,
            }
        })
        .then((res)=>res.json())
        .then((data)=>{setMusic(data.data);
            setAudioUrl(data.data.audio_url);
            musicDispatch({type:'play'})
            play();
        })
        .catch((err)=>console.log(err));

        return ()=> stop();
    },[musicId])

    // useEffect(()=>{
    //     if(duration>0){
    //         if(isFirstTimeRender.current){
    //             isFirstTimeRender.current= false;
    //             return;
    //         }
    //         play();
    //         if(musicStatus==='play'){
    //             setIsCapable(true);
    //         }
    //     }
    //     return ()=> stop();
    // },[duration])

    // useEffect(()=>{
    //     if(isCapable){
    //         if(musicStatus==='play') play();
    //         else pause();
    //     }
    // },[musicStatus])

    function handlePlay(){
        musicDispatch({type:'play'})
    }
    function handlePause(){
        musicDispatch({type:'pause'})
    }
    function handleVolume(){
        console.log('hello');
    }

    const artistArray= music?.artist?.map((eItem)=>{
        return eItem.name;
    })

    console.log(musicStatus)
    return (
    
        <div className='musicPlayerContainer'>
            <div className='musicLeft'>
                <img className='musicLogo' src={music?.thumbnail} />
                <div className='musicDetails'>
                    <h3>{music?.title}</h3>
                    <p>{artistArray?.join(', ')}</p>
                </div>
            </div>
            <div className='musicMiddle'>
                <div className='musicPlayerIcons'>
                <SkipPreviousIcon style={{fontSize:'2rem',cursor: 'pointer'}}/>
                <Replay10Icon style={{fontSize:'2rem',cursor: 'pointer'}}/>
                {musicStatus!=='play' ? 
                <PlayArrowIcon onClick={handlePlay} style={{fontSize:'3rem',cursor: 'pointer'}} />
                : 
                <PauseIcon onClick={handlePause} style={{fontSize:'3rem',cursor: 'pointer'}} />
                }
                <Forward10Icon style={{fontSize:'2rem',cursor: 'pointer'}}/>
                <SkipNextIcon style={{fontSize:'2rem',cursor: 'pointer'}}/>
                </div>
            </div>
            <div className='musicRight'>
                <VolumeUpIcon onClick={handleVolume}  style={{fontSize:'2rem'}}/>
            </div>
        </div>
      )
}

export default MusicPlayer