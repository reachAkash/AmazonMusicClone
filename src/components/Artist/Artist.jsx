import React, { useEffect, useState } from "react";
import "./Artist.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "../Button/Button.jsx";
import { artist_URL } from "../../utils/Constants.js";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { album_Current_URL } from "../../utils/Constants";
import { ContextProvider } from "../../utils/Provider";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { useMusic } from "../../utils/MusicProvider.jsx";
import musicAnimation from "../../assets/musicAnimation.mp4";

function Artist() {
  const [loader, setLoader] = useState(true);
  const [artistData, setArtistData] = useState({});
  const { musicPlayer } = useMusic();
  const { cardType, id } = useParams();
  const [firstAlbumSong, setFirstAlbumSong] = useState("");
  const { musicDispatch } = useMusic();

  useEffect(() => {
    function fetchArtist() {
      fetch(artist_URL + id, {
        headers: {
          projectId: "b8cjykmftj1r",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setArtistData(data.data);
        })
        .catch((err) => alert(err));
    }

    function fetchAlbum() {
      fetch(album_Current_URL + id, {
        headers: {
          projectId: "b8cjykmftj1r",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setArtistData(data.data);
          console.log(data.data);
          setFirstAlbumSong(data?.data?.songs[0]);
        })
        .catch((err) => alert(err));
    }

    if (cardType === "album" || cardType === "podcasts") fetchAlbum();
    else fetchArtist();
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  function handlePlayAlbum() {
    musicDispatch({ type: "setMusicId", payload: firstAlbumSong?._id });
  }

  return loader ? (
    <Loader />
  ) : (
    <>
      <div
        className="albumImageContainer"
        style={{
          backgroundImage: `url(${artistData?.image})`,
          backgroundPosition: "bottom",
        }}
      >
        <div className="albumContainer">
          <div className="albumTop">
            <div className="albumTopLeft">
              <img
                className="albumTopLeftImg"
                src={
                  artistData?.image ? artistData?.image : artistData?.thumbnail
                }
              />
            </div>
            <div className="albumTopRight">
              <div className="albumTopRightContents">
                <div style={{ textTransform: "uppercase" }}>
                  {cardType} PlayList
                </div>
                <h1>
                  {artistData?.name ? artistData?.name : artistData?.title}
                </h1>
              </div>
              <div className="albumTopRightContents">
                <div>{artistData?.description}</div>
                <div>{artistData?.languages?.join(", ")}</div>
                <div>
                  {artistData?.songs?.length} songs •{" "}
                  {artistData?.songs?.length * 1.5} mins
                </div>
              </div>
              <div className="albumTopRightContents albumControls">
                <Button
                  onClick={handlePlayAlbum}
                  className="albumRightContentsButton"
                  style={{
                    backgroundColor: "lightseagreen",
                    border: "none",
                    gap: "0.3rem",
                    color: "black",
                    width: "7rem",
                    height: "3rem",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PlayArrowIcon /> Play
                </Button>
                <ShuffleIcon
                  style={{
                    fontSize: "1.7rem",
                    opacity: "0.6",
                    pointerEvents: "none",
                  }}
                  className="albumShuffleIcon"
                />
                <AddIcon
                  style={{
                    fontSize: "2.2rem",
                    opacity: "0.6",
                    pointerEvents: "none",
                  }}
                  className="albumAddIcon"
                />
                <ShareIcon
                  style={{
                    fontSize: "1.7rem",
                    opacity: "0.6",
                    pointerEvents: "none",
                  }}
                  className="albumShareIcon"
                />
                <MoreHorizIcon
                  style={{
                    fontSize: "1.7rem",
                    opacity: "0.6",
                    pointerEvents: "none",
                  }}
                  className="albumOptionsIcon"
                />
              </div>
            </div>
          </div>
          <div className="albumBottom">
            {artistData?.songs?.length >= 1 ? (
              artistData.songs.map((song, idx) => {
                return <ArtistSongs data={song} key={idx} count={idx + 1} />;
              })
            ) : (
              <h2>NO Songs Found!</h2>
            )}
          </div>
        </div>
      </div>
      {musicPlayer == "active" && <MusicPlayer />}
    </>
  );
}

function ArtistSongs({ data, count }) {
  const { width } = ContextProvider();
  const [showPlayerIcon, setShowPlayerIcon] = useState(false);
  const { musicDispatch } = useMusic();
  const [favIcon, setFavIcon] = useState(false);
  const [clicked, setClicked] = useState(false);

  function handleShowIcon() {
    console.log("hi im inside");
    setShowPlayerIcon(true);
  }

  function handleHideIcon() {
    console.log("hi im inside hide");
    setShowPlayerIcon(false);
  }

  console.log(data);

  function handlePlay() {
    musicDispatch({ type: "setMusicId", payload: data._id });
    setClicked((prev) => !prev);
    console.log("hi im clicked");
  }

  async function addFavFunction() {
    setFavIcon((prev) => !prev);
    const res = await fetch(
      "https://academics.newtonschool.co/api/v1/music/favorites/like",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${decodeURIComponent(document.cookie)}`,
          projectID: "b8cjykmftj1r",
        },
        body: JSON.stringify({
          songId: data._id,
        }),
      }
    );
    const addedSong = await res.json();
    console.log(addedSong);
  }

  return (
    <div className="albumBottomContainer">
      <div className="albumBottomLeft">
        <div>{count}</div>
        <div
          className="artistSongImageContainer"
          onMouseEnter={handleShowIcon}
          onMouseLeave={handleHideIcon}
        >
          <img
            className="artistSongListImage"
            src={data.thumbnail ? data.thumbnail : data.image}
          />
          {showPlayerIcon && (
            <div className="playIconAlbum" onClick={handlePlay}>
              {" "}
              {clicked ? (
                <video
                  className="w-4 h-4"
                  src={musicAnimation}
                  muted
                  autoPlay
                  loop
                />
              ) : (
                <PlayArrowIcon style={{ fontSize: "1.4rem" }} />
              )}
            </div>
          )}
        </div>
        <div className="albumMiddle">
          <div className="artistSongName">{data?.title}</div>
          <div className="artistSongMood">{data?.mood}</div>
          <Button
            style={{
              backgroundColor: "lightseagreen",
              width: "5rem",
              height: "1.5rem",
              borderRadius: "2px",
              border: "none",
              color: "black",
              borderRadius: "5px  ",
            }}
          >
            Lyrics
          </Button>
        </div>
      </div>
      <div className="albumBottomRight">
        {width > 935 && <div>{data?.title}</div>}
        <div className=" flex align-middle justify-around">
          {width > 633 && <div>02:30</div>}
          <div className="albumBottomRightIcons">
            {!favIcon ? (
              <FavoriteBorderIcon
                onClick={addFavFunction}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FavoriteIcon
                onClick={addFavFunction}
                style={{ cursor: "pointer", color: "red" }}
              />
            )}
            <MoreHorizIcon style={{ opacity: "0.5", pointerEvents: "none" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
