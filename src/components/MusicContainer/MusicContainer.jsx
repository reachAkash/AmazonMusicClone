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
    const[activeIcon,setActiveIcon]= useState({
        left:false,
        right:true
    });
    const containerRef= useRef();
    const nav= useNavigate();
  
    function handleSeeAll(){
        // nav(`/search/seeall/${title}`);
        nav(`/search/seeall/${title}`);
    }

    function handleSlider(e){
        activeIcon.left===true ? setActiveIcon({left:false,right:true}):setActiveIcon({left:true,right:false});
        console.log('clikced')
        if(e.target.id==='sliderRight') containerRef.current.scrollBy(2800, 0);
        else containerRef.current.scrollBy(-2800, 0);
    }
    

  
  return (
    <div className={`container ${backColor}`}>

        <div className="containerHeader">
            <div className="title">
                {title}
            </div>
            <div className="seeAllItems">
               {width>='438' && <div className="sliderIcons">
                    <KeyboardArrowLeftIcon style={activeIcon.left?{color:'white'}:{color:'gray',pointerEvents:'none'}} onClick={handleSlider} id='sliderLeft' className='sliderLeftIcon' />
                    <KeyboardArrowRightIcon style={activeIcon.right?{color:'white'}:{color:'gray',pointerEvents:'none'}} onClick={handleSlider} id='sliderRight' className='sliderRightIcon' />
                </div>}
                    <button className={`seeAllBtn`} onClick={handleSeeAll} >SEE ALL</button>
            </div>
        </div>
        
        <div className="containerSongs" ref={containerRef} >
                {data?.map((music,idx)=>{   
                    if(idx>=10) return null;
                    return <MusicCard cardType={cardType} key={idx} music={music} type={type}/>
                })}
            </div>
    </div>
  )
}



