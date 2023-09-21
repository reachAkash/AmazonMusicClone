import React,{useState} from 'react'
import './MusicContainer.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '../Button/Button'
import MusicCard from '../MusicCard/MusicCard';
function MusicContainer({musicData}) {

    const{title,data,type}= musicData;
   
    
  return (
    <div className='container'>

        <div className="containerHeader">
            <div className="title">
                {title}
            </div>
            <div className="seeAllItems">
                <div className="sliderIcons">
                    <KeyboardArrowLeftIcon className='sliderLeftIcon' />
                    <KeyboardArrowRightIcon className='sliderRightIcon' />
                </div>
                    <Button className='seeAllBtn' >SEE ALL</Button>
            </div>
        </div>
        
        <div className="containerSongs" >
                {data?.map((music,idx)=>{
                    return <MusicCard key={idx} music={music} />
                })}
            </div>
    </div>
  )
}




export default MusicContainer