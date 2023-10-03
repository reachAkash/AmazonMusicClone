import React, { useContext } from 'react'
import "./Subscription.css"
import primeLogo from "../../assets/AmazonMusic-Logo-white.png"
import millionsongs from "../../assets/100millionSongs.png"
import Adfreemusic from "../../assets/AdFree Music.png"
import unlimitedDownload from "../../assets/unlimitedDownload.png"
import alexa from "../../assets/HandFree Alexa.png"
import podcasts from "../../assets/Follow Podcasts.png"
import ContextProvider from '../../utils/Provider'
import { useNavigate } from 'react-router-dom'

function PriceCard({title, type, price}){
    return(
        <div className='priceCard'>
            <div>
                <p className='pricetitle'>{title}</p>
                <p className='pricetype'>{type}</p>
            </div>
            <div>
                <p className='price'>$ {price}</p>
                <p className='planprice'>per month</p>
            </div>
        </div>
    )
}

function Subscription() {

    // const {width} = ContextProvider();
    const width= '1000px'
    const nav = useNavigate()
  return (
    <div className='subscribe'>
        <div className='subscribePageImg'>
            <img style={{width: width<640 && "80%"}} src={primeLogo}/>
            {width>640 && <p>pricing</p>}
        </div>
        <div className='priceContainer'>
            <PriceCard title="Individual" type="non-Prime members" price="9.99"/>
            <PriceCard title="Family" type="Prime members" price="14.99"/>
            <PriceCard title="Individual" type="non-Prime members" price="7.99"/>
            <PriceCard title="Students" price="4.99"/>
        </div>
        <div className='subscribeImageDiv'>
            <p>MORE ABOUT PRIME MUSIC</p>
            <div className='subscribeimg'>
                <img src={alexa} /> 
                <img src={millionsongs} /> 
                <img src={Adfreemusic} /> 
                <img src={podcasts} /> 
                <img src={unlimitedDownload} /> 
            </div>
        </div>
    </div>
  )
}

export default Subscription;
