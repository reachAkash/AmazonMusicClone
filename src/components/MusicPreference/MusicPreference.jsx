import React, { useEffect } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import "./MusicPreference.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ContextProvider } from '../../utils/Provider';

function MusicPreference() {

    const nav= useNavigate();

    const language = [
        {
            lang: "Hindi",
            native: "हिंदी"
        },{
            lang: "English",
            native: "English"
        },{
            lang: "Punjabi",
            native: "ਪੰਜਾਬੀ"
        },{
            lang: "Tamil",
            native: "தமிழ்"
        },{
            lang: "Telugu",
            native: "తెలుగు"
        },{
            lang: "Kannada",
            native: "ಕನ್ನಡ"
        },{
            lang: "Malayalam",
            native: "മലയാളം"
        },{
            lang: "Marathi",
            native: "मराठी"
        },{
            lang: "Bengali",
            native: "বাংলা"
        },{
            lang: "Bhojpuri",
            native: "भोजपुरी"
        },{
            lang: "Gujarati",
            native: "ગુજરાતી"
        },{
            lang: "Rajasthani",
            native: "राजस्थानी"
        },{
            lang: "Assamese",
            native: "অসমীয়া"
        },{
            lang: "Odia",
            native: "ଓଡ଼ିଆ"
        }
    ]

    const {setPreference} = ContextProvider();
    const [selectedLanguages, setSelectedLanguages] = useState([])

    function goBack(){
        nav(-1);
    }
    
    useEffect(()=>{
        if(localStorage.getItem("musicPreferences")){
            setSelectedLanguages([...JSON.parse(localStorage.getItem("musicPreferences"))])
        }
        document.getElementById("preference-portal").style.display = 'flex'

        return ()=>{
            document.getElementById("preference-portal").style.display = "none"
        }
    },[])

    useEffect(()=>{
        if(selectedLanguages){
            localStorage.setItem("musicPreferences", JSON.stringify(selectedLanguages))
        }
    },[selectedLanguages])

  return (
    <div className='musicPreferPage'>
        <div className='musicPreferPageContainer'>
            <div className='closeBtn' onClick={()=>goBack()}>
                <ClearIcon/>
            </div>
            <p className='musicPageTitle'>Music Preferences</p>
            <p className='muaicPageSubtitle'>Set your preferences to discover music you love.</p>
            {
                language.map((lang, idx)=>(
                    <div className='languageTile' key={idx}>
                        <div>
                            <p style={{color: selectedLanguages.includes(idx)&& "#25d1da"}}>{lang.lang}</p>
                            <p className='originallang'>{lang.native}</p>
                        </div>
                        <ThumbUpOffAltIcon className='thumb' style={{color: selectedLanguages.includes(idx)&& "#25d1da"}} onClick={()=>{
                            if(selectedLanguages.includes(idx)){
                                setSelectedLanguages(()=>selectedLanguages.filter((lang)=>{
                                    return lang !== idx 
                                }))
                            }
                            else{
                                setSelectedLanguages((prev)=>[...prev, idx])
                            }
                        }}/>
                    </div>
                ))
            }
            <button className='ClearallBtn' onClick={()=>{setSelectedLanguages([]);goBack()}}>CLEAR ALL</button>
            <button className='ContinueBtn' onClick={()=>{goBack()}}>CONTINUE</button>
        </div>
    </div>  
  )
}

export default MusicPreference;