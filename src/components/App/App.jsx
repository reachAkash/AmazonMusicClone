import './App.css'
import {Routes,Route} from 'react-router-dom';
import Provider from '../../utils/App';
import Navbar from './Navbar';
import Home from './Home'
import PopUp from '../PopUp'
function App() {


  return (
    <Provider>
       <Navbar/> 
       <Routes>
          <Route path='/' element={<Home/>} />
       </Routes>
    </Provider> 
  )
}

export default App
