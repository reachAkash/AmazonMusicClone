import { useState , lazy, Suspense} from 'react';
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
import Podcast from '../Podcast/Podcast';
import Subscription from '../Subscription/Subscription';
import MusicPreference from '../MusicPreference/MusicPreference.jsx';
import User from '../User/User';
import Explicit from '../Explicit/Explicit';
import MusicProvider from '../../utils/MusicProvider';
const SearchContainer = lazy(()=>import('../SearchContainer/SearchContainer'));
function App() {

  return (
    <Provider>
      <MusicProvider>
       <Navbar/> 
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/podcast' element={<Podcast/>} />  
          <Route path='/search' element={<Search/>} />
          <Route path='/signup' element={<SignUpForm/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/update' element={<UpdatePasswordForm/>} />
          <Route path='/:cardType/:id' element={<Artist/>}/>
          <Route path='/search/:typeId/:queryId' element={
            <Suspense fallback={<Loader/>}>
              <SearchContainer/>
            </Suspense>
          } />  
          <Route path='/search/:queryId' element={<SearchContainer/>} />  
          <Route path='/subscription' element={<Subscription/>} />  
          <Route path='/preference' element={<MusicPreference/>} />  
          <Route path='/user' element={<User/>} />  
          <Route path='/explicit' element={<Explicit/>}/>  
       </Routes>
      </MusicProvider>
    </Provider> 
  )
}

export default App

