import './App.css'
import {Routes,Route} from 'react-router-dom';
import AppContext from '../../utils/App';
import Navbar from '../Navbar/Navbar.jsx';
import Home from '../Home/Home.jsx'
import PopUp from '../PopUp/PopUp'
import Search from '../Search/Search';
function App() {


  return (
    <AppContext>
       <Navbar/> 
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/search' element={<Search/>} />
       </Routes>
    </AppContext> 
  )
}

export default App

