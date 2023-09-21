import React,{useState,useEffect} from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
// import AmazonLogo from 'Amazon-Music-Logo600.png';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PodcastsRoundedIcon from '@mui/icons-material/PodcastsRounded';
import HeadsetRoundedIcon from '@mui/icons-material/HeadsetRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { KeyboardArrowUpRounded } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useNavigate} from 'react-router-dom';

function Navbar() {

    const[LibraryItemsHovered,setLibraryItemsHovered]= useState(false);
    const[scrolled,setScrolled]= useState(false);
    const[input,setInput]= useState('');
    const nav= useNavigate();
    // for navbar glassy css
    useEffect(()=>{

        function scroll(){
            if(window.scrollY>10) setScrolled(true);
            else setScrolled(false);
        }
        window.addEventListener('scroll',scroll);
        return ()=> window.removeEventListener('scroll',scroll);

    },[])

    function hovered(){
        setLibraryItemsHovered(true);
    }

    function outHovered(){
        setLibraryItemsHovered(false);
    }

    function redirect(){
        nav('/search');
    }

    function handleInput(){

    }

  return (
     <div className={`navbar ${scrolled ? 'scrolled':''}`}>
          <div className="navbarLeft">

            <div className="navLogo">
                <img src={'https://i.pinimg.com/originals/47/b7/bd/47b7bdac4285ee24654ca7d68cf06351.png'}
                alt="amazonLogo" className='logoImg'/>
            </div>

            <div className="navLinks">
                <NavLink to={'/'} className="navItems">
                    <div className="navLinkHome">
                    <HomeRoundedIcon/>
                    Home
                    </div>
                </NavLink>
                <NavLink to={'/podcast'} className="navItems">
                    <div className="navLinkPodcast">
                    <PodcastsRoundedIcon/>
                    Podcast
                    </div>
                </NavLink>
                <NavLink className="navItems navItemLibrary" onMouseEnter={hovered} onMouseLeave={outHovered}>
                    <div className="navLinkLibrary">
                        <HeadsetRoundedIcon/>
                        Library
                        { LibraryItemsHovered ? <KeyboardArrowUpRounded/> : <KeyboardArrowDownRoundedIcon/>}
                            
                        {LibraryItemsHovered && 
                         <div className="hoveredItems">
                            <LibraryItems/>
                        </div>
                        }
                    </div>
                </NavLink>
            </div>
           
            </div>

            <div className="navbarRight">
                <form action="" className='inputForm'>
                    <input className='inputSearch' value={input} onChange={handleInput} onClick={redirect} placeholder='Search...'/>
                    <div className='searchIconContainer'>
                        <SearchOutlinedIcon style={{color:'black'}} className='searchIcon'/>
                    </div>
                </form>
                <div className="userLogo">
                    <LightModeIcon style={{fontSize:'2rem'}} className='lightModeIcon'/>
                    <AccountCircleIcon style={{fontSize:'2rem'}} className='userLogoIcon'/>
                </div>
            </div>
    </div>
  )
}

function LibraryItems(){
    return (
        <div className='navItems'>
            <h3 className='hoverItem'>Music</h3>
            <h3 className='hoverLine'></h3>
            <h3 className='hoverItem'>Podcast</h3>
        </div>
    )    
}

export default Navbar