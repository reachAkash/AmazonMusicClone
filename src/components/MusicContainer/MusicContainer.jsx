import React,{useEffect, useState, useRef} from 'react'
import './MusicContainer.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '../Button/Button'
import MusicCard from '../MusicCard/MusicCard';
import { useNavigate } from 'react-router-dom';

export default function MusicContainer({musicData,setMusicPlayed,setSongUrl}) {

    const{title,data,type}= musicData;
    const nav= useNavigate();
  
    function handleSeeAll(){
        nav(`/search/type/seeall/query/${title}`);
    }
  
  return (
    <div className='container'>

        <div className="containerHeader">
            <div className="title">
                {title}
            </div>
            <div className="seeAllItems">
                <div className="sliderIcons">
                    <KeyboardArrowLeftIcon  className='sliderLeftIcon' />
                    <KeyboardArrowRightIcon className='sliderRightIcon' />
                </div>
                    <button className='seeAllBtn' onClick={handleSeeAll} >SEE ALL</button>
            </div>
        </div>
        
        <div className="containerSongs">
                {data?.map((music,idx)=>{   
                    return <MusicCard setSongUrl={setSongUrl} setMusicPlayed={setMusicPlayed} key={idx} music={music} type={type}/>
                })}
            </div>
    </div>
  )
}



