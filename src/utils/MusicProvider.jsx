import React, { useContext, useEffect, useReducer } from 'react'
import { createContext } from 'react'

const MusicContext= createContext(null);

function MusicProvider({children}) {

    const initialState={
        musicPlayer:'inactive',
        musicStatus:'pause',
        musicId:''
    }

    function musicReducer(state,action){
        switch(action.type){
            case 'play': return {...state,musicStatus:'play'}
            case 'pause': return {...state,musicStatus:'pause'}
            case 'setMusicId': return{...state,musicStatus:'play',musicPlayer:'active',musicId:action.payload}
            default: return state;
        }
    }
    const [musicState,musicDispatch]= useReducer(musicReducer,initialState);

    useEffect(()=>{
        console.log(musicState);
    },[musicState])
    

    let obj={
        musicPlayer: musicState.musicPlayer,
        musicStatus: musicState.musicStatus,
        musicId: musicState.musicId,
        musicDispatch
    }

  return (
    <MusicContext.Provider value={obj}>{children}</MusicContext.Provider>
  )
}

export function useMusic(){
    return useContext(MusicContext);
}

export default MusicProvider