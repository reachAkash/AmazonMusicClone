import { useEffect, useState } from "react";
import {project_ID} from '../utils/Constants';

export default function useGetSongData(endPoint){

    // const[musicData,setMusicData] = useState([]);
    let musicData;

        fetch(endPoint, {
            headers: {
                'projectId': {project_ID}
            }
        })
        .then((res)=>res.json())
        .then((data)=>{musicData=data.data, console.log(data.data), console.log(endPoint)});
        

    return musicData;
}


