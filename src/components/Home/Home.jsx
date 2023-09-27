import React, { useState } from 'react'
import './Home.css'
import {ContextProvider} from '../../utils/Provider'
import MusicContainer from '../MusicContainer/MusicContainer'
import MusicPlayer from '../MusicPlayer/MusicPlayer'
function Home({setSongUrl,setMusicPlayed,currentSong,setCurrentSong}) {
  
    const {musicState}= ContextProvider();
    
  return(
    <div className='home'>
        {musicState?.map((musicCard,idx)=>{
          return <MusicContainer key={idx} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongUrl={setSongUrl} setMusicPlayed={setMusicPlayed} musicData={musicCard} />
        })}
    </div>
  )
}

export default Home