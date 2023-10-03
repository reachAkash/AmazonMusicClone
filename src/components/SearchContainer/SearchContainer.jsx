import React, { useEffect, useState } from 'react'
import { project_ID } from '../../utils/Constants';
import { filter_Songs_URL } from '../../utils/Constants';
import MusicCard from '../MusicCard/MusicCard.jsx';
import './SearchContainer.css'
import Loader from '../Loader/Loader.jsx'
import {useParams} from 'react-router-dom';
import { ContextProvider } from '../../utils/Provider';
import { data } from 'autoprefixer';
function SearchContainer({searchData}) {


    const {musicState,input} = ContextProvider();
    const {typeId,queryId}= useParams();
    const obj= useParams();

    console.log(typeId,queryId)
   
    const[searchedData,setSearchedData] = useState([]);
    const[loader,setLoader]= useState(true);
    const[fetchedData,setFetchedData]= useState([]);

    useEffect(()=>{

        async function getData(){
           
            try{
                fetch(`https://academics.newtonschool.co/api/v1/music/song?filter={"${typeId}":"${queryId.toLowerCase()}"}`,{
                    headers:{
                        'projectId': project_ID
                    }
                })
                .then((res)=>res.json())
                .then((data)=>{setSearchedData(data)})
                setLoader(false);
            }
            catch(err){
                throw new Error(err);
            }

        }

        
        async function getSearchedData(){
           console.log('inside')
           let currentData;
            try{
                fetch(`https://academics.newtonschool.co/api/v1/music/song?filter={"song":"${input}"}`,{
                    headers:{
                        'projectId': project_ID
                    }
                })
                .then((res)=>res.json())
                .then((data)=>data?.status==='fail' && setSearchedData(data) || setSearchedData(data.data));

                console.log(data);

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
        else if(typeId==='artist'){
            console.log(typeId);
            const artists= musicState.find((e)=>{
                return e.type=='artist'
            })?.data?.find((eData)=>{
                return eData.name==queryId;
            })
            setSearchedData(artists);
            console.log(artists);
            setLoader(false);
        }
        else{
            getSearchedData();
        }

    },[])

    
  return loader ? <Loader/> : (
    <div className='searchPage'>
        <div className="searchContainer">
        <div className="searchedHeader">
            { typeId==='seeall' ? <span>{queryId}</span> : <div>Found {searchedData?.data?.length} results for <span>{queryId}</span></div> }
        </div>
        <div className="searchedBody">
           {/* {
            typeId==='mood' || typeId=='seeall' || typeId=='' ?
                searchedData?.data?.map((music,idx)=>{
                    return <MusicCard key={idx} music={music} />
                }) :
                <MusicCard music={searchedData} type='artist' />
        } */}

           {
            typeId==='mood' || typeId=='seeall' || typeId=='mood' && typeId!='seeall' && typeId!='artist' ?
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

export default SearchContainer;