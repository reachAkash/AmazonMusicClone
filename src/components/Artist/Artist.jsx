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

function Artist() {
    const[loader,setLoader]= useState(true);
    const [artistData,setArtistData]= useState({});
    
    const {id}= useParams();

    useEffect(()=>{
        fetch(artist_URL+id,{
            headers:{
                'projectId': 'b8cjykmftj1r' 
            }
        })
        .then((res)=>res.json())
        .then((data)=>{setArtistData(data.data); console.log(data.data)})
        .catch((err)=>alert(err));
        setTimeout(()=>{
            setLoader(false);
        },500);
    },[]);

    

  return loader ? <Loader/> : (
    <div className='albumImageContainer' style={{backgroundImage:`url(${artistData.image})`,backgroundPosition:'bottom'}}>
    <div className='albumContainer'>
        <div className='albumTop'>
            <div className='albumTopLeft'>
                <img className='albumTopLeftImg' src={artistData.image} />
            </div>
            <div className='albumTopRight'>
                <div className='albumTopRightContents'>
                    <div>PlayList</div>
                    <h1>{artistData.name}</h1>
                </div>
                <div className='albumTopRightContents'>
                    <div>{artistData.description}</div>
                    <div>{artistData?.languages?.join(', ')}</div>
                    <div>99 songs • 5 hr and 54 min</div>
                </div>
                <div className='albumTopRightContents albumControls'>
                    <Button className='albumRightContentsButton' style={{backgroundColor:'lightseagreen',border:'none',gap:'0.3rem',color:'black',width:'7rem',height:'3rem',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center'}} ><PlayArrowIcon /> Play</Button>
                    <ShuffleIcon style={{fontSize:'1.7rem',}} className='albumShuffleIcon'/>
                    <AddIcon style={{fontSize:'2.2rem',}} className='albumAddIcon'/>
                    <ShareIcon style={{fontSize:'1.7rem',}} className='albumShareIcon'/>
                    <MoreHorizIcon style={{fontSize:'1.7rem',}} className='albumOptionsIcon'/>
                </div>
            </div>
        </div>
        <div className='albumBottom'>
            {artistData?.songs?.map((song,idx)=>{
                return <ArtistSongs data={song} key={idx} count={idx+1} /> 
            })}
        </div>
        </div>
    </div>
  )
}

function ArtistSongs({data,count}){
    return ( 
    <div className='albumBottomContainer'>
    <div className='albumBottomLeft'>
    <div>{count}</div>
    <div className='artistSongImageContainer'>
      <img  src={data.thumbnail?data.thumbnail:data.image}/>
    </div>
    <div>
        <div className='artistSongName'>{data?.title}</div>
        <div className='artistSongMood'>{data?.mood}</div>
        <Button style={{backgroundColor:'lightseagreen', width:'5rem',height:'1.5rem',borderRadius:'2px',border:'none',color:'black',borderRadius:'5px  '}}>Lyrics</Button>
    </div>
</div>
<div className='albumBottomRight'>
    <div>{data?.title}</div>
    <div>02:30</div>
    <div className='albumBottomRightIcons'>
        <AddIcon/>
        <MoreHorizIcon/>
    </div>
</div>
</div>
)
}

export default Artist;