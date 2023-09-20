import React,{createContext, useEffect, useReducer, useState} from 'react'
import { paginations_Songs_URL } from './Constants';
import { Album_URL } from './Constants';


const Context= createContext(null);

function AppContext({children}) {

    const[userIsLoggedIn,setUserLoggedIn]= useState(false);

    const initialState=[
      {type:'song',data:[]},
      {type:'album',data:[]},
      {type:'artist',data:[]},
      {type:'latest',data:[]},
      {type:'paginationSongs',data:[]},
      {type:'filterSongs',data:[]}
    ]

    function musicReducer(state,action){
      // switch(action.type){
      //   case 
      // }
    }

    const[musicState,setMusicState]= useReducer(musicReducer,initialState); 

    useEffect(()=>{
      musicState.map((eItem)=>{
        console.log(eItem);
      //   if(eItem.type=='song'){
      //     fetch(paginations_Songs_URL, {
      //       headers: {
      //           'projectId': 'YOUR_PROJECT_ID'
      //       }
      //   }).then((res)=>res.json())
      //   .then((data)=>console.log(data));
      //   }

      //   else if(eItem.type=='album'){
      //     fetch(Album_URL),{
      //       headers:{
      //         'projectId': 'YOUR_PROJECT_ID'
      //       }
      //     }.then((res)=>res.json())
      //     .then((data)=>console.log(data));
      //   }
      //   else return null;
      })
    },[])

    const obj={
        userIsLoggedIn,
        setUserLoggedIn,
        musicState,
    }
  return (
    <AppContext.Provider value={obj}>{children}</AppContext.Provider>
  )
}

export default AppContext