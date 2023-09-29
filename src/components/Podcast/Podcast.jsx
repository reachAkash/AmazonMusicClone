import React from 'react'
import { ContextProvider } from '../../utils/Provider'
import MusicContainer from '../MusicContainer/MusicContainer';
import Search from '../Search/Search';
import './Podcast.css'

function Podcast() {

    const {musicState}= ContextProvider();
    const podcastData= musicState.find((e)=> e.title==='Podcasts');
    console.log(podcastData)
  return (
    <div className='home'>
        <MusicContainer musicData={podcastData} />
        <div className='podcastBtns'>
        <Search cardType={podcastData.cardType} />
        </div>
    </div>
  )
}

export default Podcast