import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Home.css";
import { ContextProvider } from "../../utils/Provider";
import MusicContainer from "../MusicContainer/MusicContainer";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import Navbar from "../Navbar/Navbar";
import { useMusic } from "../../utils/MusicProvider";
import Loader from "../Loader/Loader";
function Home({ setSongUrl, setMusicPlayed, currentSong, setCurrentSong }) {
  const { musicState, backColor, loggedInUser } = ContextProvider();

  return (
    <div className={`home ${backColor} w-full`}>
      {musicState?.map((musicCard, idx) => {
        return <MusicContainer key={idx} musicData={musicCard} />;
      })}
    </div>
  );
}

export default Home;
