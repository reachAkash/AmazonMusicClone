  import React,{createContext, useContext, useEffect, useReducer, useState} from 'react'
  import Loader from '../components/Loader/Loader.jsx';
  import { album_Current_URL, paginations_Songs_URL } from './Constants';
  import { Album_URL } from './Constants';
  import { artist_URL } from './Constants';
  import { latest_Songs_URL } from './Constants';
  import { filter_Songs_URL } from './Constants';
  import {project_ID} from './Constants';
  import Offline from '../components/Offline/Offline.jsx';


  const Context= createContext(null);

  function Provider({children}) {

      const[offline,setOffline]= useState(true);
      const[loader,setLoader]= useState(true);
      const[userIsLoggedIn,setUserLoggedIn]= useState(false);
      const paginationLastLink1= 'page=15&limit=10';
      const paginationLastLink2= 'page=3&limit=10';
      const paginationLastLink3= 'page=7&limit=10';
      const artistsLastLink= 'page=9&limit=10';




      const initialState=  [
        { title: "Refresh Your mood", data: [], type: "album"},
        { title: "Retro Hits", data: [], type: "song" }, 
        { title: "All Stars", data: [], type: "artist" },
        { title: "All Time Hits", data: [], type: "latest" },
        { title: "Let's Get Classy", data: [], type: "paginationsSong" },
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
              return getData(eItem.type, Album_URL);
            } else if (eItem.type === 'artist') {
              return getData(eItem.type, paginations_Songs_URL + artistsLastLink);
            } else if (eItem.type === 'latest') {
              return getData(eItem.type, paginations_Songs_URL + paginationLastLink3);
            } else if (eItem.type === 'paginationsSong') {
              return getData(eItem.type, paginations_Songs_URL+paginationLastLink2);
            }
          });

          // await Promise.all(promises);
        }


        useEffect(() => {
          // window.addEventListener('online', () => {
            // console.log('Online');
            updateState();
            setOffline(false);
            setTimeout(() => {
              setLoader(false);
            }, 1200);
          // });
        
          // window.addEventListener('offline', () => {
          //   console.log('Offline');
          //   setOffline(true);
          // });
        }, []);


      const obj={
          userIsLoggedIn,
          setUserLoggedIn,
          musicState,
      }
      return loader ? <Loader/> : (
      <Context.Provider value={obj}>
        {children}
      </Context.Provider>
    )
  }

  export function ContextProvider(){
    return useContext(Context);
  }

  export default Provider;