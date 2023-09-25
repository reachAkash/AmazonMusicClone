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
function App() {

  return (
    <Provider>
       <Navbar/> 
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signInBanner' element={<PopUp/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/signup' element={<SignUpForm/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/update' element={<UpdatePasswordForm/>} />
       </Routes>
    </Provider> 
  )
}

export default App

