import React from 'react'
import './Search.css';
import Button from '../Button/Button.jsx';

const colorDeg = ["0deg", "45deg", "90deg", "135deg", "180deg", "225deg", "270deg", "315deg"]
const topCategories = [
    "Love",
    "Happy",
    "Party",
    "Workout",
    "Travel",
    "Chill",
    "At Home",
    "At the Movies"
];

const middleCategories= [   
    "Playlists",
    "Stations",
    "Indian Classical",
    "Indian Devotional",
    "Women in Music",
    "Amazon Music Originals",
];

const bottomCategories= [
    "Top Podcasts",
    "Arts",
    "Business",
    "Religion & Spirituality",
    "Education",
    "Health & Fitness",
    "Comedy",
    "True Crime",
    "News",
    "Society & Culture",
    "Kids & Family",
    "Sports",
    "History",
    "Music",
    "Fiction",
    "Science",
    "TV & Film",
    "Leisure",
    "Technology"
];


function Search() {

return (
    <div className='searchPage'>
        <div className="searchTop">
            <h2>Trending</h2>
        <div className="topButtonsContainer">
            {topCategories?.map((eItem,idx)=>{
                return <SearchCategory data={eItem} key={idx} />
            })}
        </div>
        </div>
        <div className="searchMiddle">
            <h2>Solo</h2>
        <div className="middleButtonsContainer">
            {middleCategories?.map((eItem,idx)=>{
                return <SearchCategory data={eItem} key={idx} />
            })}
        </div>
        </div>
        <div className="searchBottom">
             <h2>Moods</h2>
        <div className="bottomButtonsContainer">
            {bottomCategories?.map((eItem,idx)=>{
                return <SearchCategory data={eItem} key={idx} />
            })}
        </div>
        </div>
    </div>
    )
}

function SearchCategory({data}){
    return <Button style={{
        backgroundImage: `linear-gradient(${colorDeg[Math.floor(Math.random() * (colorDeg.length-1))]}, 
                                          #${Math.floor(Math.random()*8388607).toString(16)}, 
                                          #${(Math.floor(Math.random()*(16777215-8388608+1))+8388608).toString(16)})`
      }} className='searchButton'>{data}</Button>
}

export default Search;