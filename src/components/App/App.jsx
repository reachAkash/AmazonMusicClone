import './App.css'
import {Routes,Route} from 'react-router-dom';
import AppContext from '../../utils/App';
import Navbar from '../Navbar/Navbar.jsx';
import Home from '../Home/Home.jsx'
import PopUp from '../PopUp/PopUp.jsx'
import Search from '../Search/Search.jsx';
import UpdatePasswordForm from '../UpdatePasswordForm/UpdatePasswordForm.jsx';
import LoginForm from '../LoginForm/LoginForm.jsx';
import SignUpForm from '../SignUpForm/SignUpForm.jsx';
function App() {


  return (
    <AppContext>
       <Navbar/> 
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/signup' element={<SignUpForm/>} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/update' element={<UpdatePasswordForm/>} />
       </Routes>
    </AppContext> 
  )
}

export default App

