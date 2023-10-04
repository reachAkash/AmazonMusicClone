import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './Home.css'
import {ContextProvider} from '../../utils/Provider'
import MusicContainer from '../MusicContainer/MusicContainer'
import MusicPlayer from '../MusicPlayer/MusicPlayer'
import Navbar from '../Navbar/Navbar'
function Home({setSongUrl,setMusicPlayed,currentSong,setCurrentSong}) {
  
    const {playSong,musicState,backColor,loggedIn}= ContextProvider();
    
  return(
    <div className={`home ${backColor}`}>
      {
        musicState?.map((musicCard,idx)=>{
          return <MusicContainer key={idx} musicData={musicCard} />
        })
      }
      {playSong.status==='active' && <MusicPlayer/>}
      </div>
  )
}

export default Home