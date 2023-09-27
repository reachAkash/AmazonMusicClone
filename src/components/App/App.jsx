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
import SearchContainer from '../SearchContainer/SearchContainer';
function App() {

  return (
    <Provider>
       <Navbar/> 
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/signup' element={<SignUpForm/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/update' element={<UpdatePasswordForm/>} />
          <Route path='/artist/:id' element={<Artist/>}/>
          <Route path='/search/type/:typeId/query/:queryId' element={<SearchContainer/>} />  
       </Routes>
    </Provider> 
  )
}

export default App

