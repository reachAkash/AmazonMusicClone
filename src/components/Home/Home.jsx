import React, { useContext } from 'react'
import './Home.css'
import Context from '../../utils/App'
import MusicContainer from '../MusicContainer/MusicContainer'
function Home() {

    // const {Context} = useContext(Context);
    // console.log(Context);
  return (
    <div className='home'>
      {Array.from({length:5},(e,idx)=><MusicContainer/>)}
    </div>
  )
}

export default Home