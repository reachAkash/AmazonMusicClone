import React,{createContext, useContext, useEffect, useReducer, useState} from 'react'
import { album_Current_URL, paginations_Songs_URL } from './Constants';
import { Album_URL } from './Constants';
import { artist_URL } from './Constants';
import { latest_Songs_URL } from './Constants';
import { filter_Songs_URL } from './Constants';
import {project_ID} from '../utils/Constants';


const Context= createContext(null);

function Provider({children}) {

    const[userIsLoggedIn,setUserLoggedIn]= useState(false);
    const paginationLastLink1= 'page=10&limit=10';
    const paginationLastLink2= 'page=4&limit=10';
    const paginationLastLink3= 'page=7&limit=10';
    const artistsLastLink= 'page=9&limit=10';




    const initialState=  [
      { title: "Trending Playlist", data: [], type: "album"},
      { title: "Retro Hits", data: [], type: "song" }, 
      { title: "All Stars", data: [], type: "artist" },
      { title: "New Release", data: [], type: "latest" },
      { title: "Let's Party", data: [], type: "paginationsSong" },
    ]

    function musicReducer(state, action) {
      switch(action.type){
        case action.type: return state.map((e)=>{
          return e.type===action.type ? {...e,data:action.payload}:{...e};
        })
        default : state;
      }
    }
    

    const[musicState,dispatch]= useReducer(musicReducer,initialState); 

    function getArtists(data){
      // destructed artists array from data
      const artists= data.map((eItem,idx)=>{
        return eItem.artist;
      })
      // creating objects of artists and pushing in array
      const artistsArray= [];
      for(let artist of artists){
        if(Array.isArray(artist)){
          artistsArray.push(...artist);
        }
      }
      return artistsArray;
    }

    async function getData(type,endPoint){
  
      const res= await fetch(endPoint,{
        headers: {
          'projectId': project_ID
      }
      });
      const data= await res.json();
      if(type=='artist'){
        dispatch({type:type,payload:getArtists(data.data)})
        return;
      } 
      dispatch({type:type,payload:data.data})
    }

      function updateState() {

        const promises = musicState.map((eItem) => {
          if (eItem.type === 'song') {
            return getData(eItem.type, paginations_Songs_URL + paginationLastLink1);
          } else if (eItem.type === 'album') {
            return getData(eItem.type, paginations_Songs_URL+paginationLastLink3);
          } else if (eItem.type === 'artist') {
            return getData(eItem.type, paginations_Songs_URL + artistsLastLink);
          } else if (eItem.type === 'latest') {
            return getData(eItem.type, latest_Songs_URL);
          } else if (eItem.type === 'paginationsSong') {
            return getData(eItem.type, paginations_Songs_URL+paginationLastLink3);
          }
        });

        // await Promise.all(promises);
      }

      useEffect(()=>{
        updateState();
      },[])

    const obj={
        userIsLoggedIn,
        setUserLoggedIn,
        musicState,
    }
  return (
    <Context.Provider value={obj}>
      {children}
    </Context.Provider>
  )
}

export function ContextProvider(){
  return useContext(Context);
}

export default Provider;