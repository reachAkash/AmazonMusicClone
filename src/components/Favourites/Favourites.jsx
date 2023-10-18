import React,{useEffect, useState} from 'react'
import './Favourites.css';
import { Outlet } from 'react-router-dom';


function Favourites() {
  const[currLocation,setCurrLocation]= useState('');

  useEffect(()=>{
    if(window.location.href.includes('music')) setCurrLocation('music');
    else setCurrLocation('podcast');
  },[])

  return (
    <div className='text-white absolute top-24'>
    <div className='text-2xl px-8 text-[aqua]'>Favourite {currLocation}</div>
    <Outlet/>
    </div>
  )
}

export default Favourites