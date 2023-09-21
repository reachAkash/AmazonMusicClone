import React from 'react'
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
    {topCategories?.map((eItem,idx)=>{
        return <searchCategory data={eItem} key={idx} />
        // console  .log(eItem);
    })}
        <h2>Solo</h2>
    {middleCategories?.map((eItem,idx)=>{

    })}
    </div>
  )
}

function searchCategory({data}){
    return <h2>Akash</h2>
}

export default Search