import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import MusicCard from '../MusicCard/MusicCard';

function FavouriteMusic() {

    const [favSongs,setFavSongs]= useState([]);
    useEffect(()=>{
        async function getFavSongs(){
            const res= await fetch(' https://academics.newtonschool.co/api/v1/music/favorites/like',{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${decodeURIComponent(document.cookie)}`,
                    'projectId': 'b8cjykmftj1r'
                }
            })
            const data= await res.json();
            setFavSongs(data?.data?.songs);
            console.log(data?.data?.songs);
        }

        getFavSongs();
    },[])
  return (
    <>
    <div className='relative text-2xl text-white flex px-4 py-4 flex-wrap'>
        {favSongs?.map((eSong)=>{
            return <MusicCard music={eSong} key={eSong._id} />
        })}
    </div>
    </>
  )
}

export default FavouriteMusic