import React,{useEffect, useState} from 'react'
import './Search.css';
import Button from '../Button/Button.jsx';
import { ContextProvider } from '../../utils/Provider';
import SearchContainer from '../SearchContainer/SearchContainer.jsx';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';



const colorDeg = ["0deg", "45deg", "90deg", "135deg", "180deg", "225deg", "270deg", "315deg"];

function Search({cardType}) {

const mood = [
    "Romantic",
    "Happy",
    "Excited",
    "Sad",
];

const [artist,setArtist]= useState([]);
const {musicState}= ContextProvider();
const {backColor} = ContextProvider();
const nav= useNavigate();
    useEffect(()=>{
        setArtist(musicState.find((e)=>e.type==='artist'));
    })

    function handleSearched(e){
        nav(`/search/${e.target.id}/${e.target.innerText}`)
    }   

return  (
    
<div className={`searchContainer ${backColor}Container`}>
    <div className='searchPage'>
        <div className="searchTop">
            <h2>Mood</h2>
        <div className="topButtonsContainer">
            {mood?.map((eItem,idx)=>{
                return <SearchCategory id='mood' handleSearched={handleSearched} data={eItem} key={idx} />
            })}
        </div>
        </div>
       {
       cardType!=='podcasts' && <div className="searchBottom">
             <h2>Artists</h2>
        <div className="bottomButtonsContainer">
            {artist?.data?.map((eItem,idx)=>{
                return <SearchCategory id='artist' handleSearched={handleSearched} data={eItem.name} key={idx} />
            })}
        </div>
        </div>
        }
    </div>
</div>
    )
}

function SearchCategory({data,handleSearched,id}){
    return <Button  style={{
        backgroundImage: `linear-gradient(${colorDeg[Math.floor(Math.random() * (colorDeg.length-1))]}, 
                                          #${Math.floor(Math.random()*8388607).toString(16)}, 
                                          #${(Math.floor(Math.random()*(16777215-8388608+1))+8388608).toString(16)})`
      }} onClick={handleSearched} id={id} className='searchButton'>{data}</Button>
}

export default Search;