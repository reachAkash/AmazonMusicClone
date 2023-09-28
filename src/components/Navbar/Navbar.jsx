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
    import { ContextProvider } from '../../utils/Provider';


    
    function Navbar() {
        
        const[LibraryItemsHovered,setLibraryItemsHovered]= useState(false);
        const[popUpShow,setPopUpShow]= useState(false);
        const[scrolled,setScrolled]= useState(false);
        const[input,setInput]= useState('');
        const[userLogoClicked,setUserLogoClicked] = useState(false);
        const {backColor,setBackColor,width} = ContextProvider();
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

        function handleInput(e){
            setInput(e.target.value)
        }

        function handleSearch(e){
            e.preventDefault();
            nav(`/search/query/${input}`);
        }

    return (
        <>
        <div className={`navbar ${backColor} ${scrolled ? 'scrolled':''}`}>
            <div className="navbarLeft">

                <div className="navLogo">
                    <img src={AmazonLogo}
                    alt="amazonLogo" className='logoImg'/>
                </div>

                <div className="navLinks">
                    <NavLink to={'/'} className="navItems">
                        <div className="navLinkHome">
                        <HomeRoundedIcon/>
                        {width>=1000 && <span>Home</span>}
                        </div>
                    </NavLink>
                    <NavLink to={'/podcast'} className="navItems">
                        <div className="navLinkPodcast">
                        <PodcastsRoundedIcon/>
                        {width>=1000 && <span>Podcast</span>}
                        </div>
                    </NavLink>
                    <Link className="navItems navItemLibrary" onMouseEnter={hovered} onMouseLeave={outHovered}>
                        <div className="navLinkLibrary">
                            <HeadsetRoundedIcon/>
                            {width>=1000 && <span>Library</span>}
                            { LibraryItemsHovered ? <KeyboardArrowUpRounded/> : <KeyboardArrowDownRoundedIcon/>}

                            {LibraryItemsHovered && <div className='libraryHover'>
                            <LibraryItems setPopUpShow={setPopUpShow} />
                            </div> 
                            }
                        </div>
                    </Link>
                </div>
            
                </div>

                <div className="navbarRight">
                    <form action="" className='inputForm' onSubmit={handleSearch}>
                        {<input className='inputSearch' value={input} onChange={handleInput} onClick={redirect} placeholder='Search...'/>}
                        <div className='searchIconContainer'>
                            <SearchOutlinedIcon style={{color:'black'}} className='searchIcon'/>
                        </div>
                    </form>
                    <div className="userLogo">
                       {backColor==='dark' && <LightModeIcon style={{fontSize:'2rem'}} className='lightModeIcon' onClick={()=>setBackColor('light')}/> || <DarkModeIcon style={{fontSize:'2rem'}} className='darkModeIcon' onClick={()=>setBackColor('dark')}/>}
                        <AccountCircleIcon onClick={()=>setUserLogoClicked(!userLogoClicked)} style={{fontSize:'2rem'}} className='userLogoIcon'/>
                    </div>
                        {userLogoClicked && <UserLoginContainer/>}
                </div>
        </div>
        {popUpShow && <PopUp/>}
        </>
    )
    }

    function LibraryItems({setPopUpShow}){

        function handlePopUp(){
            setPopUpShow((prev)=>!prev);
            console.log('clicked')
            console.log(setPopUpShow)
        }
        return (
            <div className='navItems'>
                <h3 className='hoverItem navHoverMusicItem' onClick={handlePopUp} >Music</h3>
                <h3 className='hoverItem' onClick={handlePopUp}>Podcast</h3>
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
                <h3 className='musicPreferenceDiv'>Music Preferences</h3>
            </div>
        )    
    }

    export default Navbar
