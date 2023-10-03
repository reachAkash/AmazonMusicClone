    import React,{useState,useEffect} from 'react'
    import ReactDOM from 'react-dom';
    import './Navbar.css';
    import { NavLink,Link } from 'react-router-dom';
    import AmazonLogo from '../../assets/Amazon-Music-Logo600.png'
    import AmazonLogoSmall from '../../assets/Amazon-Music-Logo640.png'
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
    import MusicPreference from '../MusicPreference/MusicPreference';


    
    function Navbar() {
        
        const[LibraryItemsHovered,setLibraryItemsHovered]= useState(false);
        const[scrolled,setScrolled]= useState(false);
        const[userLogoClicked,setUserLogoClicked] = useState(false);
        const nav= useNavigate();
        const {backColor,setInputFocused,inputFocused,input,setInput,setBackColor,width,loggedIn,tryAmazonPopUp,setTryAmazonPopUp} = ContextProvider();

        // for navbar glassy css
        useEffect(()=>{

            function scroll(){
                if(window.scrollY>10) setScrolled(true);
                else setScrolled(false);
            }
            window.addEventListener('scroll',scroll);
            return ()=> window.removeEventListener('scroll',scroll);
        },[width])


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
            if(input.trim()==='') return ;

            console.log(input)
            nav(`/search/query/${input}`);
        }

    return (
        <>
        <div className={`navbar ${backColor} ${scrolled ? 'scrolled':''}`}>
           {inputFocused ? <InputElement redirect={redirect} handleSearch={handleSearch} handleInput={handleInput} /> :
           <>
            <div className="navbarLeft">

                <div className="navLogo">
                    <img src={width>='840' ? AmazonLogo : AmazonLogoSmall}
                    alt="amazonLogo" className='logoImg'/>
                </div>

                <div className="navLinks">
                    <NavLink to={'/'} className="navItems">
                        <div className="navLinkHome">
                        <HomeRoundedIcon/>
                        {width>=1280 && <span>Home</span>}
                        </div>
                    </NavLink>
                    <NavLink to={'/podcast'} className="navItems">
                        <div className="navLinkPodcast">
                        <PodcastsRoundedIcon/>
                        {width>=1280 && <span>Podcast</span>}
                        </div>
                    </NavLink>
                    <Link className="navItems navItemLibrary" onMouseEnter={hovered} onMouseLeave={outHovered}>
                        <div className="navLinkLibrary">
                            <HeadsetRoundedIcon/>
                            {width>=1280 && <span>Library</span>}
                            {width>=1280 && <span>
                               { LibraryItemsHovered ? <KeyboardArrowUpRounded/> : <KeyboardArrowDownRoundedIcon/>}
                            </span>
                            }

                            {LibraryItemsHovered && <div className='libraryHover'>
                            <LibraryItems />
                            </div> 
                            }
                        </div>
                    </Link>
                </div>
            
                </div>

                <div className="navbarRight">
                  <form action="" className='inputForm' onSubmit={handleSearch}>
                       {width >=635 && <input className='inputSearch' value={input} onChange={handleInput} onClick={redirect} placeholder='Search...'/>}
                        <div className='searchIconContainer'>
                            <SearchOutlinedIcon style={{color:width>=640 ? 'black':'aqua'}} className='searchIcon' onClick={(e)=>width<=634? setInputFocused(true): handleSearch(e) } />
                        </div>
                    </form>
                    <div className="userLogo">
                       {backColor==='dark' && <LightModeIcon style={{fontSize:'2rem'}} className='lightModeIcon' onClick={()=>setBackColor('light')}/> || <DarkModeIcon style={{fontSize:'2rem'}} className='darkModeIcon' onClick={()=>setBackColor('dark')}/>}
                        <AccountCircleIcon onClick={()=>setUserLogoClicked(!userLogoClicked)} style={{fontSize:'2rem'}} className='userLogoIcon'/>
                    </div>
                        {userLogoClicked && <UserLoginContainer />}
                </div>
           </>
                }
        </div>
        {tryAmazonPopUp && <PopUp/>}
        </>
    )
    }

    function InputElement({handleInput,redirect,handleSearch}){
        const {input,setInput,setInputFocused} = ContextProvider();

        return (
            <form className='inputElementDiv' onSubmit={handleSearch}>
                <input className='inputElementSearch'
                value={input} onChange={handleInput} 
                onClick={redirect} placeholder='Search...'/>
                <h3 onClick={()=>setInputFocused(false)} >Cancel</h3>
            </form> 
        )
    }

    function LibraryItems(){

        const {loggedIn,setTryAmazonPopUp} = ContextProvider();

        const nav= useNavigate();

        function handlePopUp(){
            if(loggedIn){
                nav('/podcast');
            }
            else{
                setTryAmazonPopUp(true);
            }
        }


        return (
            <div className='navItems'>
                <h3 className='hoverItem navHoverMusicItem' onClick={handlePopUp} >Music</h3>
                <h3 className='hoverItem' onClick={handlePopUp}>Podcast</h3>
            </div>
        )    
    }

    function UserLoginContainer(){
        const {loggedIn,setLoggedIn,setPreference} = ContextProvider();
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
                <Button onClick={()=> loggedIn ? setLoggedIn(false) : nav('/signup')} style={signUpBtnstyle} className='signInButton'>{loggedIn ? 'Logout': 'Sign Up' }</Button>
                {/* <h3 className='musicPreferenceDiv' onClick={()=>{setPreference(true)}}>Music Preferences</h3> */}
            </div>
        )    
    }

    export default Navbar
