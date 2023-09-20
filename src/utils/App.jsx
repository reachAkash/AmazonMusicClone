import React,{createContext, useEffect, useReducer, useState} from 'react'
import { album_Current_URL, paginations_Songs_URL } from './Constants';
import { Album_URL } from './Constants';
import { artist_URL } from './Constants';
import { latest_Songs_URL } from './Constants';
import { filter_Songs_URL } from './Constants';
import useGetSongData from '../Hooks/useGetSongData';


export const Context= createContext(null);

function Provider({children}) {

    const[userIsLoggedIn,setUserLoggedIn]= useState(false);
    const paginationLastLink1= 'page=4&limit=10';
    const paginationLastLink2= 'page=5&limit=10';
    const paginationLastLink3= 'page=6&limit=10';

    const initialState=  [
      { title: "Trending Songs", data: [], type: "song" }, 
      { title: "Trending Playlist", data: [], type: "album"},
      { title: "All Stars", data: [], type: "artist" },
      { title: "New Release", data: [], type: "latest" },
      { title: "Let's Party", data: [], type: "paginationsSong" },
    ]
    function musicReducer(state,action){
      switch(action.type){
        case action.type:
          return state.map((s)=>{
            if(s.type===action.type){
              return {...state,data:action.payload}
            } 
            else {
              return {...state};
            }
          })
        default : return state;
      }
    }

    const[musicState,dispatch]= useReducer(musicReducer,initialState); 

    useEffect(()=>{

      musicState.map((eItem)=>{

        if(eItem.type==='song'){
          const musicData= useGetSongData(paginations_Songs_URL+paginationLastLink1);
          dispatch({type:eItem.type})
        }

        else if(eItem.type==='album'){
          const musicData= useGetSongData(Album_URL);
          dispatch({type:eItem.type,payload:musicData});
        }

        else if(eItem.type==='artist'){
          const musicData= useGetSongData(paginations_Songs_URL+paginationLastLink2);
          const artist= musicData?.data?.artists;
          dispatch({type:eItem.type,payload:artist});
        }

        else if(eItem.type==='latest'){
          const musicData= useGetSongData(latest_Songs_URL);
          dispatch({type:eItem.type,payload:musicData});
        }

        else{
          const musicData= useGetSongData(paginations_Songs_URL+paginationLastLink3);
          console.log(musicData +'at App'  )
          dispatch({type:eItem.type,payload:musicData});
        }
      })

        },[])
        

        useEffect(()=>{
          console.log(musicState)
        },[musicState])


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

export default Provider;