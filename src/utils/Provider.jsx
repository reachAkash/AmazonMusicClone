  import React,{createContext, useContext, useEffect, useReducer, useState} from 'react'
  import Loader from '../components/Loader/Loader.jsx';
  import { album_Current_URL, paginations_Songs_URL } from './Constants';
  import { Album_URL } from './Constants';
  import { artist_URL } from './Constants';
  import { latest_Songs_URL } from './Constants';
  import { filter_Songs_URL } from './Constants';
  import {project_ID} from './Constants';
  import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";


  const Context= createContext(null);

  function Provider({children}) {

      const[offline,setIsOffline]= useState(false);
      const[loader,setLoader]= useState(true);
      const[userIsLoggedIn,setUserLoggedIn]= useState(false);
      const[width,setWidth]= useState(1400);
      const[backColor,setBackColor] = useState('dark');
      const paginationLastLink1= 'page=15&limit=10';
      // const paginationLastLink2= 'page=12&limit=60';
      const paginationLastLink2= 'page=16&limit=50';
      const paginationLastLink3= 'page=7&limit=10';
      const paginationLastLink4= 'page=18&limit=50';
      const artistsLastLink= 'page=99&limit=10';
      const searchedMusicLink= 'page=15&limit=50';


      function updateState() {
        try{
          const promises = musicState.map((eItem) => {
            if (eItem.type === 'song') {
              return getData(eItem.type, paginations_Songs_URL + paginationLastLink1);
            } else if (eItem.type === 'album') {
              return getData(eItem.type, paginations_Songs_URL+ paginationLastLink4);
            } else if (eItem.type === 'artist') {
              return getData(eItem.type, paginations_Songs_URL + artistsLastLink);
            } else if (eItem.type === 'latest') {
              return getData(eItem.type, paginations_Songs_URL + paginationLastLink3);
            } else if (eItem.type === 'paginationsSong') {
              return getData(eItem.type, paginations_Songs_URL+paginationLastLink2);
            }else if(eItem.type==='searchedMusic'){
               return getData(eItem.type,paginations_Songs_URL+searchedMusicLink);
            }
          });
        }
        catch(err){
          console.log(err);
          toast.error("Error Fetching Data", {
          position: toast.POSITION.TOP_CENTER
        });
        }
        finally{
          setTimeout(()=>{
            setLoader(false);
          },1000);
        }
          // await Promise.all(promises);
        }   


      const initialState=  [
        { title: "Let's Get Classy", data: [], type: "paginationsSong" },
        { title: "Refresh Your Mood", data: [], type: "album"},
        { title: "All Stars", data: [], type: "artist" },
        { title: "Retro Hits", data: [], type: "song" }, 
        { title: "Time to Pray", data: [], type: "latest" },
        { title: "The Hangover", data: [], type: "searchedMusic" },
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

      try{
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
      catch(err){
        console.log(err);
        setIsOffline(true);
        toast.error("We're Under Maintainance, Sorry for the incovenience", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }



        useEffect(() => {
        
            updateState();
        
          window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
          });

          return window.removeEventListener('resize',()=>{
            setWidth(window.innerWidth);
          })
        }, []);


      const obj={
          userIsLoggedIn,
          setUserLoggedIn,
          musicState,
          width,
          backColor,
          setBackColor
      }
      return !offline ? loader ? <Loader/> : (
      <Context.Provider value={obj}>
        {children}
      </Context.Provider> 
    ): <ToastContainer/>
  }

  export function ContextProvider(){
    return useContext(Context);
  }

  export default Provider;