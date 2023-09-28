import './App.css'
import {Routes,Route} from 'react-router-dom';
import Provider from '../../utils/Provider';
import Navbar from '../Navbar/Navbar.jsx';
import Home from '../Home/Home.jsx'
import PopUp from '../PopUp/PopUp.jsx'
import Search from '../Search/Search.jsx';
import { ContextProvider } from '../../utils/Provider';
import UpdatePasswordForm from '../UpdatePasswordForm/UpdatePasswordForm.jsx';
import LoginForm from '../LoginForm/LoginForm.jsx';
import SignUpForm from '../SignUpForm/SignUpForm.jsx';
import Loader from '../Loader/Loader';
import Artist from '../Artist/Artist';
import MusicPlayer from '../MusicPlayer/MusicPlayer.jsx';
import SearchContainer from '../SearchContainer/SearchContainer';
import { useState } from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {

  const [musicPlayed,setMusicPlayed] = useState(false);
  const [songUrl,setSongUrl] = useState('');


  return (
    <Provider>
       <Navbar/> 
       <Routes>
          <Route path='/' element={<><Home setSongUrl={setSongUrl} setMusicPlayed={setMusicPlayed}/>
          {musicPlayed && <MusicPlayer songUrl={songUrl} musicPlayed={musicPlayed} setMusicPlayed={setMusicPlayed} />}</> }
           />
          <Route path='/search' element={<Search/>} />
          <Route path='/signup' element={<SignUpForm/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/update' element={<UpdatePasswordForm/>} />
          <Route path='/artist/:id' element={<Artist/>}/>
          <Route path='/search/type/:typeId/query/:queryId' element={<SearchContainer/>} />  
          <Route path='/search/query/:queryId' element={<SearchContainer/>} />  
          <Route path='/podcast' element={<ErrorPage/>} />  
       </Routes>
    </Provider> 
  )
}

export default App

