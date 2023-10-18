import React,{useEffect,useState} from 'react'
import './Artist.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '../Button/Button.jsx';
import { artist_URL } from '../../utils/Constants.js';
import { useParams } from 'react-router-dom';
import { data } from 'autoprefixer';
import Loader from '../Loader/Loader';
import {album_Current_URL} from '../../utils/Constants';
import { ContextProvider } from '../../utils/Provider';

function Artist() {
    const[loader,setLoader]= useState(true);
    const [artistData,setArtistData]= useState({});
    
    const {cardType,id}= useParams();
   console.log(cardType,id);

    useEffect(()=>{
        function fetchArtist(){

            fetch(artist_URL+id,{
                headers:{
                    'projectId': 'b8cjykmftj1r' 
                }
            })
            .then((res)=>res.json())
            .then((data)=>{setArtistData(data.data)})
            .catch((err)=>alert(err));
        }

        function fetchAlbum(){
            fetch(album_Current_URL+id,{
                headers:{
                    'projectId': 'b8cjykmftj1r' 
                }
            })
            .then((res)=>res.json())
            .then((data)=>{setArtistData(data.data); console.log(data.data)})
            .catch((err)=>alert(err));
        }

        if(cardType==='album' || cardType==='podcasts') fetchAlbum();
        else fetchArtist();
        setTimeout(()=>{
            setLoader(false);
        },500);
    },[]);

    

  return loader ? <Loader/> : (
    <div className='albumImageContainer' style={{backgroundImage:`url(${artistData?.image})`,backgroundPosition:'bottom'}}>
    <div className='albumContainer'>
        <div className='albumTop'>
            <div className='albumTopLeft'>
                <img className='albumTopLeftImg' src={artistData?.image?artistData?.image:artistData?.thumbnail} />
            </div>
            <div className='albumTopRight'>
                <div className='albumTopRightContents'>
                    <div style={{textTransform:'uppercase'}}>{cardType} PlayList</div>
                    <h1>{artistData?.name?artistData?.name:artistData?.title}</h1>
                </div>
                <div className='albumTopRightContents'>
                    <div>{artistData?.description}</div>
                    <div>{artistData?.languages?.join(', ')}</div>
                    <div>{artistData?.songs?.length} songs • {artistData?.songs?.length*1.5} mins</div>
                </div>
                <div className='albumTopRightContents albumControls' >
                    <Button className='albumRightContentsButton' style={{backgroundColor:'lightseagreen',border:'none',gap:'0.3rem',color:'black',width:'7rem',height:'3rem',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none',opacity:'0.5'}} ><PlayArrowIcon /> Play</Button>
                    <ShuffleIcon style={{fontSize:'1.7rem',opacity:'0.6',pointerEvents:'none'}} className='albumShuffleIcon'/>
                    <AddIcon style={{fontSize:'2.2rem',opacity:'0.6',pointerEvents:'none'}} className='albumAddIcon'/>
                    <ShareIcon style={{fontSize:'1.7rem',opacity:'0.6',pointerEvents:'none'}} className='albumShareIcon'/>
                    <MoreHorizIcon style={{fontSize:'1.7rem',opacity:'0.6',pointerEvents:'none'}} className='albumOptionsIcon'/>
                </div>
            </div>
        </div>
        <div className='albumBottom'>
            {artistData?.songs?.length>=1 ?
                artistData.songs.map((song,idx)=>{
                    return <ArtistSongs data={song} key={idx} count={idx+1} /> 
                })
            : <h2>NO Songs Found!</h2>
        }
        </div>
        </div>
    </div>
  )
}

function ArtistSongs({data,count}){

    const{width} = ContextProvider();
    console.log(data);

    return ( 
    <div className='albumBottomContainer'>
    <div className='albumBottomLeft'>
    <div>{count}</div>
    <div className='artistSongImageContainer'>
      <img className='artistSongListImage' src={data.thumbnail?data.thumbnail:data.image}/>
    </div>
    <div className='albumMiddle'>
        <div className='artistSongName'>{data?.title}</div>
        <div className='artistSongMood'>{data?.mood}</div>
        <Button style={{backgroundColor:'lightseagreen', width:'5rem',height:'1.5rem',borderRadius:'2px',border:'none',color:'black',borderRadius:'5px  '}}>Lyrics</Button>
    </div>
</div>
<div className='albumBottomRight'>
    {width>935 && <div>{data?.title}</div>}
    <div className='w-1/2 flex align-middle justify-around'>
        {width>633 && <div>02:30</div>}
        <div className='albumBottomRightIcons'>
            <AddIcon style={{opacity:'0.5',pointerEvents:'none'}} />
            <MoreHorizIcon style={{opacity:'0.5',pointerEvents:'none'}}/>
        </div>
    </div>
</div>
</div>
)
}

export default Artist;