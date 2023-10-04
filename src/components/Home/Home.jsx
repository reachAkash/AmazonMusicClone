import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './Home.css'
import {ContextProvider} from '../../utils/Provider'
import MusicContainer from '../MusicContainer/MusicContainer'
import MusicPlayer from '../MusicPlayer/MusicPlayer'
import MusicPreference from '../MusicPreference/MusicPreference'
import Navbar from '../Navbar/Navbar'
function Home({setSongUrl,setMusicPlayed,currentSong,setCurrentSong}) {
  
    const {musicState,backColor,loggedIn}= ContextProvider();
    
  return(
    <div className={`home ${backColor}`}>
      {
        musicState?.map((musicCard,idx)=>{
          return <MusicContainer key={idx} musicData={musicCard} />
        })
      }
        </div>
  )
}

export default Home