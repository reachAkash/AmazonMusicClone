import React from 'react'
import './Search.css';
import Button from '../Button/Button.jsx';

function Search() {
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
  return (
    <div className='searchPage'>
        <h2>Trending</h2>
    <div className="topButtonsContainer">
    {topCategories?.map((eItem,idx)=>{
        return <SearchCategory data={eItem} key={idx} />
    })}
    </div>
        <h2>Solo</h2>
    {middleCategories?.map((eItem,idx)=>{
        return <SearchCategory data={eItem} key={idx} />
    })}
        <h2>Moods</h2>
    {bottomCategories?.map((eItem,idx)=>{
        return <SearchCategory data={eItem} key={idx} />
    })}
    </div>
  )
}

function SearchCategory({data}){
    return <Button className='searchButton'>{data}</Button>
}

export default Search;