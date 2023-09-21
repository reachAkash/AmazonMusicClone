import React from 'react'
import './Home.css'
import {ContextProvider} from '../../utils/App'
import MusicContainer from '../MusicContainer/MusicContainer'
function Home() {

    const {musicState}= ContextProvider();

  return (
    <div className='home'>
        {musicState.map((musicCard,idx)=>{
          return <MusicContainer key={idx} musicData={musicCard} />
        })}
    </div>
  )
}

export default Home