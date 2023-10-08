    import React,{useState,useEffect, useRef} from 'react'
    import ReactDOM from 'react-dom';
    import './Navbar.css';
    import { NavLink,Link, json, useLoaderData } from 'react-router-dom';
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
        const {backColor,setInputFocused,inputFocused,
            input,setInput,setBackColor,width,
            loggedInUser,tryAmazonPopUp,setTryAmazonPopUp} = ContextProvider();
        const userLogoRef= useRef();
        
        // for navbar glassy css
        useEffect(()=>{

            function scroll(){
                if(window.scrollY>1) setScrolled(true);
                else setScrolled(false);
            }
            window.addEventListener('scroll',scroll);
            
            return ()=> window.removeEventListener('scroll',scroll);
        },[width])


        useEffect(()=>{
            function checkUserLogo(e){
                if(e.target==userLogoRef.current) setUserLogoClicked(!userLogoClicked);

                else if(userLogoRef.current && userLogoRef.current!=e.target){
                    setUserLogoClicked(false);
                }else{
                    setUserLogoClicked(true);
                }
            }

            window.addEventListener('click',checkUserLogo);

            return function(){
                window.removeEventListener('click',checkUserLogo);
            }
            },[userLogoClicked])

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
            let items= JSON.parse(localStorage.getItem('searchedMusic'));
            if(!items) items=[];
            items.push(input);
            localStorage.setItem('searchedMusic',JSON.stringify(items)); 
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
                       <i className="fa-solid fa-user userLogoIcon" ref={userLogoRef} ></i>
                        { userLogoClicked ? loggedInUser.status ? <LoggedUserInfo  /> : <UserLoginContainer setUserLogoClicked={setUserLogoClicked} userLogoClicked/> : null}
                    </div>
                </div>
           </>
                }
        </div>
        {tryAmazonPopUp && <PopUp/>}
        </>
    )
    }

    function LoggedUserInfo(){
        const {setLoggedInUser} = ContextProvider();
        const nav= useNavigate();


       return <div className='userLogoDiv' style={{ backgroundColor: 'rgba(0,0,0,0.8)',
       backdropFilter: 'blur(10rem)'}}>
            <Link className="hoverableItems" target='_blank' to='https://www.amazon.in/music/settings?ref=dp_amp_settings_yasettings_click&language=en_IN'>Your Amazon Music Settings</Link>
            <Link className="hoverableItems" to='/user' >My Profile</Link>
            <Link className="hoverableItems" to='/preference'>Music Preferences</Link>
            <Link className="hoverableItems" to='/explicit'>Block Explicit Songs</Link>
            <Link className="hoverableItems" target='_blank' to='https://www.amazon.co.uk/b/?node=22830131031'>Import Your Playlist</Link>
            <Link className="hoverableItems" target='_blank' to='https://www.amazon.in/gp/help/customer/display.html?pop-up=1&nodeId=201380010&language=en_IN'>Terms & Conditions</Link>
            <Link className="hoverableItems" to='/gethelp'>Get Help</Link>
            <div className="hoverableItems" onClick={()=>setLoggedInUser({name:'',status:false})} style={{border:'none'}}>Sign Out</div>
        </div>
    }

    function InputElement({handleInput,redirect,handleSearch}){
        const {input,setInput,setInputFocused} = ContextProvider();

        return (
            <form className='inputElementDiv' onSubmit={handleSearch}>
                <input className='inputElementSearch'
                value={input} onChange={handleInput} autoFocus
                onClick={redirect} placeholder='Search...'/>
                <h3 onClick={()=>setInputFocused(false)} style={{cursor:'pointer'}} >Cancel</h3>
            </form> 
        )
    }

    function LibraryItems(){

        const {loggedInUser,setTryAmazonPopUp} = ContextProvider();

        const nav= useNavigate();

        function handlePopUp(){
            if(loggedInUser.status){
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

    function UserLoginContainer({userLogoClicked,setUserLogoClicked}){
        const nav= useNavigate();
        const userLogoRef= useRef();

        const signUpBtnstyle= {
            width:'85%',
            height:'2.5rem',
            outline: '2px solid black',
            backgroundColor:'aqua',
            color:'black',
            border:'2px solid white',
            borderRadius:'30px',
            marginBottom:'0.3rem'
        }
    
        return (
            <div className='userLogoDiv' ref={userLogoRef} style={{ backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10rem)'}}>
                <Button onClick={()=> nav('/signup')} style={signUpBtnstyle} className='signInButton'>Sign Up</Button>
                <h3 className='hoverableItems' style={{border:'none'}} onClick={()=>{nav('/preference')}}>Music Preferences</h3>
            </div>
        )    
    }

    export default Navbar
