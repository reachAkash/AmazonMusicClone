  import React,{createContext, useContext, useEffect, useReducer, useState} from 'react'
  import Loader from '../components/Loader/Loader.jsx';
  import ReactDOM  from 'react-dom';
  import { album_Current_URL, paginations_Songs_URL } from './Constants';
  import { Album_URL } from './Constants';
  import { artist_URL } from './Constants';
  import { latest_Songs_URL } from './Constants';
  import { filter_Songs_URL } from './Constants';
  import {project_ID} from './Constants';
  import MusicPlayer from '../components/MusicPlayer/MusicPlayer.jsx';
  import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";


  const Context= createContext(null);

  function Provider({children}) {

      const[offline,setIsOffline]= useState(false);
      const[loader,setLoader]= useState(false);
      const[input,setInput]= useState('');
      const[inputFocused,setInputFocused] = useState(false);
      const[tryAmazonPopUp,setTryAmazonPopUp]= useState(false);
      const[loggedInUser,setLoggedInUser]= useState({
        name:'Akash',
        status: true,
      });
      const[width,setWidth]= useState('');
      const[backColor,setBackColor] = useState('dark');
      const paginationLastLink1= 'page=15&limit=10';
      const paginationLastLink2= 'page=16&limit=50';
      const paginationLastLink3= 'page=7&limit=10';
      const paginationLastLink4= 'page=18&limit=50';
      const artistsLastLink= 'page=99&limit=10';
      const searchedMusicLink= 'page=15&limit=50';
      const podcastsLink= 'page=3';


      function updateState() {
        try{
          setLoader(true);
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
            }else if(eItem.type==='searchedMusic'){
             
               return getData(eItem.type,paginations_Songs_URL+searchedMusicLink);
            }else{
            
               return getData(eItem.type,Album_URL+'?'+podcastsLink);
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
        { title: "Refresh Your Mood", data: [], type: "album", cardType:'album'},
        { title: "Let's Get Classy", data: [], type: "paginationsSong",cardType:'song' },
        { title: "All Stars", data: [], type: "artist" ,cardType:'artist' },
        { title: "Retro Hits", data: [], type: "song", cardType:'song'}, 
        { title: "Time to Pray", data: [], type: "latest", cardType:'song' },
        { title: "The Hangover", data: [], type: "searchedMusic", cardType:'song' },
        { title: "Podcasts", data: [], type: "podcasts", cardType:'podcasts' },
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
            setWidth(window.innerWidth)
          const resize= window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
          });

          const load= window.addEventListener('load',()=>{
            setWidth(window.innerWidth);
          })

          return window.removeEventListener('load',load);
          return window.removeEventListener('resize',resize)

         
        }, []);


      const obj={
          loggedInUser,
          setLoggedInUser,
          input,
          setInput,
          inputFocused,
          setInputFocused,
          tryAmazonPopUp,
          setTryAmazonPopUp,
          loader,
          setLoader,
          musicState,
          width,
          backColor,
          setBackColor,
      }
      return !offline ? loader ? <Loader/> : (
      <Context.Provider value={obj}>
        {children}
      </Context.Provider> 
    ): <ToastContainer/>
  }

  export function ContextProvider(){
    const data= useContext(Context);
    if(!data) throw new Error('context cannot be called outside');
    return useContext(Context);
  }

  export default Provider;