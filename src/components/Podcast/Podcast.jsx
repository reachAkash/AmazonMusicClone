import React from 'react'
import { ContextProvider } from '../../utils/Provider'
import MusicContainer from '../MusicContainer/MusicContainer';
import Search, { MoodButtons } from '../Search/Search';
import Navbar from '../Navbar/Navbar';
import './Podcast.css'
import { useNavigate } from 'react-router-dom';

function Podcast() {
    const nav = useNavigate();
    const {musicState}= ContextProvider();
    const podcastData= musicState.find((e)=> e.title==='Podcasts');
    function handleSearched(e){
      nav(`/search/${e.target.id}/${e.target.innerText}`)
  }
    
  return (
    <div className='home'>
        <MusicContainer musicData={podcastData} />
        <MoodButtons handleSearched={handleSearched} />
    </div>
  )
}

export default Podcast