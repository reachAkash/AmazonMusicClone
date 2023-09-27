import React, { useEffect, useState } from 'react'
import { project_ID } from '../../utils/Constants';
import MusicCard from '../MusicCard/MusicCard.jsx';
import './SearchContainer.css'
import Loader from '../Loader/Loader.jsx'
import {useParams} from 'react-router-dom';
import { ContextProvider } from '../../utils/Provider';
function SearchContainer({searchData}) {


    const {musicState} = ContextProvider();
    const {typeId,queryId}= useParams();
    const[searchedData,setSearchedData] = useState([]);
    const[loader,setLoader]= useState(true);

    useEffect(()=>{
        async function getData(){
            try{
                fetch(`https://academics.newtonschool.co/api/v1/music/song?filter={"${typeId}":"${queryId.toLowerCase()}"}`,{
                    headers:{
                        'projectId': project_ID
                    }
                })
                .then((res)=>res.json())
                .then((data)=>setSearchedData(data))
                setLoader(false);
            }
            catch(err){
                throw new Error(err);
            }

        }
        
        if(typeId==='mood'){
            getData();
        }

        else if(typeId==='seeall'){
            const data= musicState.find((e)=>{
                return e.title===queryId;
            })
            setSearchedData(data);
            setLoader(false);
        }
        else{
            const artists= musicState.find((e)=>{
                return e.type=='artist'
            })?.data?.find((eData)=>{
                return eData.name==queryId;
            })
            setSearchedData(artists);
            console.log(artists);
            setLoader(false);
        }
    },[])
  return loader ? <Loader/> : (
    <div className='searchPage'>
        <div className="searchContainer">
        <div className="searchedHeader">
            { typeId==='seeall' ? <span>{queryId}</span> : <div>Found {searchedData?.data?.length} results for <span>{queryId}</span></div> }
        </div>
        <div className="searchedBody">
           {
            typeId==='mood' || typeId=='seeall' ?
                searchedData?.data?.map((music,idx)=>{
                    return <MusicCard key={idx} music={music} />
                }) :
                <MusicCard music={searchedData} type='artist' />
        }
        </div>
        </div>
    </div>
  )
}

export default SearchContainer