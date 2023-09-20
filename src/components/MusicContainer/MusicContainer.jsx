import React,{useState} from 'react'
import './MusicContainer.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Button from '../Button/Button'
import MusicCard from '../MusicCard/MusicCard';
function MusicContainer() {


  return (
    <div className='container'>

        <div className="containerHeader">
            <div className="title">
                Trending Songs
            </div>
            <div className="seeAllItems">
                <div className="sliderIcons">
                    <KeyboardArrowLeftIcon className='slideLeftIcon'/>
                    <KeyboardArrowRightIcon className='sliderRightIcon'/>
                </div>
                    <Button className='seeAllBtn' >SEE ALL</Button>
            </div>
        </div>
        
        <div className="containerSongs">
            {Array.from({length:10},(e,idx)=>{
               return  <MusicCard/>
                })}
                </div>
    </div>
  )
}




export default MusicContainer