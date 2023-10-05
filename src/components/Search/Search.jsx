import React,{useEffect, useState} from 'react'
import './Search.css';
import Button from '../Button/Button.jsx';
import { ContextProvider } from '../../utils/Provider';
import SearchContainer from '../SearchContainer/SearchContainer.jsx';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { Album_URL, project_ID } from '../../utils/Constants';




const colorDeg = ["0deg", "45deg", "90deg", "135deg", "180deg", "225deg", "270deg", "315deg"];

function Search({cardType}) {

    const[searchedHistory,setSearchedHistory]= useState(null);
const mood = [
    "Romantic",
    "Happy",
    "Excited",
    "Sad",
];

const [artist,setArtist]= useState([]);
const {musicState,backColor,input}= ContextProvider();
const nav= useNavigate();
    useEffect(()=>{
        setArtist(musicState.find((e)=>e.type==='artist'));
    })

    function handleSearched(e){
        nav(`/search/${e.target.id}/${e.target.innerText}`)
    }  

    useEffect(()=>{
        let history= JSON.parse(localStorage.getItem('searchedMusic'));
        if(history) setSearchedHistory(history);
       
    },[])

    function handleHistory(){
        localStorage.removeItem('searchedMusic');
        setSearchedHistory(null);
    }
return input ? <Suggestions/> : (
    
<div className={`searchContainer ${backColor}Container`}>
    <div className='searchPage'>
       {cardType!=='podcasts' && searchedHistory && <div className="searchedHistory">
            <h3 className="searchedHistoryHeader">
                Search History
            </h3>
            <div className="searchedHistoryContainer">
                <div className="HistoryDeleteIcon" style={{cursor:'pointer',backgroundColor:'gray',padding:'0.4rem',backgroundColor:'rgba(255,255,255,0.3)',borderRadius:'50%'}}>
            <CloseIcon onClick={()=>handleHistory()} />
                </div>
            <div className="searchedHistoryList">
                {searchedHistory?.map((eItem,idx)=>{
                    return <Button key={idx} style={{backgroundColor:'rgba(255,255,255,0.2)',padding:'0.3rem 2rem', borderRadius:'20px'}}>{eItem}</Button>
                })}
                </div>
            </div>
        </div>}
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

function Suggestions(){
    const {input} = ContextProvider();
    const[suggestions,setSuggestions]= useState([]);
    const[currentSuggestions,setCurrentSuggestions]= useState(suggestions);
    const nav= useNavigate();
    useEffect(()=>{
        
        fetch(Album_URL,{
            headers:{
                'projectId':project_ID
            }
        })
        .then((res)=>res.json())
        .then((data)=>{setSuggestions(data.data);setCurrentSuggestions(data.data.slice(0,10))});
    },[])

    useEffect(()=>{

        const ans= suggestions?.filter(eItem=>eItem.title.split(' ').join('').toLowerCase().includes(input.split(' ').join('').toLowerCase()));
        setCurrentSuggestions(ans);

    },[input])
    
    
    return <div className="suggestionsContainer">
        <h1 className="suggestionHeader">
            Suggestions
        </h1>
        <div className="suggestionsList">
            {currentSuggestions.map((eItem,idx)=>{
                return <Link key={idx} className='suggestionItems' to={`/search/query/${eItem.title}`}>{eItem.title}</Link>
            })}
        </div>
    </div>
}

export default Search;