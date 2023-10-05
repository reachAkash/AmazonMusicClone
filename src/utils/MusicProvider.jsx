import React, { useReducer } from 'react'
import { createContext } from 'react'

function MusicProvider() {
    const MusicContext= createContext(null);

    const initialState={
        activity:'inactive',
        status:'pause',
        id:''
    }

    function musicReducer(state,action){
        switch(action.type){
            case 'play': return {...state,status:'play'}
            case 'pause': return {...state,status:'pause'}
            case 'getMusicId': return{...state,activity:'active',id:action.payload}
        }
    }

    function setPlay(){
        dispatchMusicPlayer({type:'play'})
    }

    function setPause(){
        dispatchMusicPlayer({type:'pause'});
    }

    function getMusicId(){
        dispatchMusicPlayer({type:'getMusicId'});
    }
    
    const [musicPlayer,dispatchMusicPlayer]= useReducer(musicReducer,initialState);
  return (
    <MusicContext.Provider value={musicPlayer}>MusicProvider</MusicContext.Provider>
  )
}

export default MusicProvider