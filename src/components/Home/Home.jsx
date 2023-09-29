import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './Home.css'
import {ContextProvider} from '../../utils/Provider'
import MusicContainer from '../MusicContainer/MusicContainer'
import MusicPlayer from '../MusicPlayer/MusicPlayer'
import MusicPreference from '../MusicPreference/MusicPreference'
function Home({setSongUrl,setMusicPlayed,currentSong,setCurrentSong}) {
  
    const {musicState,backColor,loggedIn,preference}= ContextProvider();
    
  return(
    <div className={`home ${backColor}`}>
      {
        !preference ?
        musicState?.map((musicCard,idx)=>{
          return <MusicContainer key={idx} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongUrl={setSongUrl} setMusicPlayed={setMusicPlayed} musicData={musicCard} />
        })
        : ReactDOM.createPortal(<MusicPreference />,document.getElementById('preference-portal'))
      }
        </div>
  )
}

export default Home