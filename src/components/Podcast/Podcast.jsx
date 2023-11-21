import React from 'react'
import { ContextProvider } from '../../utils/Provider'
import MusicContainer from '../MusicContainer/MusicContainer';
import Search from '../Search/Search';
import Navbar from '../Navbar/Navbar';
import './Podcast.css'

function Podcast() {

    const {musicState}= ContextProvider();
    const podcastData= musicState.find((e)=> e.title==='Podcasts');
    
  return (
    <div className='home'>
        <MusicContainer musicData={podcastData} />
        <div className='podcastBtns'>
          {/* {console.log(podcastData.cardType)} */}
        <Search cardType={podcastData.cardType} />
        </div>
    </div>
  )
}

export default Podcast