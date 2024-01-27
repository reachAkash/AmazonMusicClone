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
    const [isLeft, setIsLeft] = useState(true)
    const [isRight, setIsRight] = useState(false)

    const containerRef= useRef();
    const nav= useNavigate();
  
    function handleSeeAll(){
        nav(`/search/seeall/${title}`);
    }

    const itemsToRender= data?.slice(0,10);
  
  return (
    <div className={`container ${backColor}`}>

        <div className="containerHeader items-center">
            <div className="title md:text-sm">
                {title}
            </div>
            <div className="seeAllItems">
               <div className="sliderIcons">
                    <KeyboardArrowLeftIcon className='sliderLeftIcon' disabled={isLeft} style={{opacity: isLeft && "0.5", color: isLeft && "grey", cursor: isLeft && "auto"}} onClick={()=>{containerRef.current.scrollBy({left: -width+150, behavior : "smooth"})}}/>
                    <KeyboardArrowRightIcon className='sliderRightIcon' disabled={isRight} style={{opacity: isRight && "0.5", color: isRight && "grey", cursor: isRight && "auto"}} onClick={()=>{containerRef.current.scrollBy({left: width-150, behavior : "smooth"})}}/>
                </div>
                <button className={`seeAllBtn`} onClick={handleSeeAll} >SEE ALL</button>
            </div>
        </div>
        
        <div className="containerSongs" ref={containerRef} onScroll={()=>{
                if(containerRef.current.scrollLeft > 0){
                    setIsLeft(false)
                }
                else{
                    setIsLeft(true)
                }
                if((containerRef.current.scrollWidth - (containerRef.current.scrollLeft+width))>0){
                    setIsRight(false)
                }
                else{
                    setIsRight(true)
                }
            }}>
            
                {itemsToRender?.map((music,idx)=>{   
                    return <MusicCard cardType={cardType} key={idx} music={music} type={type}/>
                })}
            </div>
    </div>
  )
}



