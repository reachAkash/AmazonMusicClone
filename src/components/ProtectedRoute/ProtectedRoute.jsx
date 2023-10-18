import React from 'react'
import {ContextProvider} from '../../utils/Provider.jsx';
import PopUp from '../PopUp/PopUp.jsx';
function ProtectedRoute({children}) {

    const {loggedInUser} = ContextProvider();

    if(!loggedInUser.status) return <PopUp/>

  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute