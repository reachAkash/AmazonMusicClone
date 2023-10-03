import React,{useEffect, useState, useRef} from 'react'
import './MusicContainer.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '../Button/Button'
import MusicCard from '../MusicCard/MusicCard';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../utils/Provider';

export default function MusicContainer({musicData}) {
    
    const{backColor,width}= ContextProvider();
    const{title,data,type,cardType}= musicData;
    const nav= useNavigate();
  
    function handleSeeAll(){
        nav(`/search/seeall/${title}`);
    }
  
  return (
    <div className={`container ${backColor}`}>

        <div className="containerHeader">
            <div className="title">
                {title}
            </div>
            <div className="seeAllItems">
               {width>='438' && <div className="sliderIcons">
                    <KeyboardArrowLeftIcon  className='sliderLeftIcon' />
                    <KeyboardArrowRightIcon className='sliderRightIcon' />
                </div>}
                    <button className={`seeAllBtn`} onClick={handleSeeAll} >SEE ALL</button>
            </div>
        </div>
        
        <div className="containerSongs">
                {data?.map((music,idx)=>{   
                    return <MusicCard cardType={cardType} key={idx} music={music} type={type}/>
                })}
            </div>
    </div>
  )
}



