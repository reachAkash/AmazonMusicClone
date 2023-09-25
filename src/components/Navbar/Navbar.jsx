    import React,{useState,useEffect} from 'react'
    import './Navbar.css';
    import { NavLink,Link } from 'react-router-dom';
    import AmazonLogo from '../../assets/Amazon-Music-Logo600.png'
    import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
    import PodcastsRoundedIcon from '@mui/icons-material/PodcastsRounded';
    import HeadsetRoundedIcon from '@mui/icons-material/HeadsetRounded';
    import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
    import { KeyboardArrowUpRounded } from '@mui/icons-material';
    import AccountCircleIcon from '@mui/icons-material/AccountCircle';
    import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
    import LightModeIcon from '@mui/icons-material/LightMode';
    import DarkModeIcon from '@mui/icons-material/DarkMode';
    import Button from '../Button/Button.jsx'
    import PopUp from '../PopUp/PopUp';
    import {useNavigate} from 'react-router-dom';


    
    function Navbar() {
        
        const[LibraryItemsHovered,setLibraryItemsHovered]= useState(false);
        const[scrolled,setScrolled]= useState(false);
        const[input,setInput]= useState('');
        const[userLogoClicked,setUserLogoClicked] = useState(false);
        
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
                    <img src={AmazonLogo}
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
                    <Link className="navItems navItemLibrary" onMouseEnter={hovered} onMouseLeave={outHovered}>
                        <div className="navLinkLibrary">
                            <HeadsetRoundedIcon/>
                            Library
                            { LibraryItemsHovered ? <KeyboardArrowUpRounded/> : <KeyboardArrowDownRoundedIcon/>}

                            {LibraryItemsHovered && <div className='libraryHover'>
                            <LibraryItems/>
                            </div> 
                            }
                        </div>
                    </Link>
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
                        <AccountCircleIcon onClick={()=>setUserLogoClicked(!userLogoClicked)} style={{fontSize:'2rem'}} className='userLogoIcon'/>
                    </div>
                        {userLogoClicked && <UserLoginContainer/>}
                </div>
        </div>
    )
    }

    function LibraryItems(){

        const nav= useNavigate();
        function signUpModal(){
            nav('/signInBanner')
        }

        return (
            <div className='navItems'>
                <h3 className='hoverItem navHoverMusicItem' onClick={()=>signUpModal()} >Music</h3>
                <h3 className='hoverItem' onClick={()=>signUpModal()}>Podcast</h3>
            </div>
        )    
    }

    function UserLoginContainer(){
        const nav= useNavigate();

        const signUpBtnstyle= {
            width:'8rem',
            height:'2.5rem',
            outline: '2px solid black',
            backgroundColor:'aqua',
            color:'black',
            border:'2px solid aqua',
            borderRadius:'30px',
        }
        return (
            <div className='userLogoDiv'>
                <Button onClick={()=>nav('/signup')} style={signUpBtnstyle} className='signInButton'>Sign In</Button>
                <h3 className='MusicPreferenceDiv'>Music Preferences</h3>
            </div>
        )    
    }

    export default Navbar
