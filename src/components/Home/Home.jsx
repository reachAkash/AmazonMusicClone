import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './Home.css'
import {ContextProvider} from '../../utils/Provider'
import MusicContainer from '../MusicContainer/MusicContainer'
import MusicPlayer from '../MusicPlayer/MusicPlayer'
function Home({setSongUrl,setMusicPlayed,currentSong,setCurrentSong}) {
  
    const {musicState,backColor,loggedIn}= ContextProvider();
    
  return(
    <div className={`home ${backColor}`}>
        {musicState?.map((musicCard,idx)=>{
          return <MusicContainer key={idx} currentSong={currentSong} setCurrentSong={setCurrentSong} setSongUrl={setSongUrl} setMusicPlayed={setMusicPlayed} musicData={musicCard} />
        })}
        {!loggedIn && ReactDOM.createPortal(<h1 style={{backgroundColor:'green',height:'10vh',width:'100%',color:'yellow',zIndex:999999}}>Logout SuccessFully</h1>,document.getElementById('portal'))}
    </div>
  )
}

export default Home