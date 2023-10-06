import React, { useEffect } from 'react'
import './User.css'
import { ContextProvider } from '../../utils/Provider'
import CreateIcon from '@mui/icons-material/Create';
import ShareIcon from '@mui/icons-material/Share';

function User() {
    const {loggedInUser} = ContextProvider();
    console.log(loggedInUser)
  return (
    <div className='user'>
        <div className="userTop">
            <div className="imgDiv">
                <img src="https://media.photographycourse.net/wp-content/uploads/2022/04/08154736/female-poses-examples.jpg" alt="" />
            </div>
            <div className="infoDiv">
                <div className="userName">{loggedInUser.name}</div>
                <div className="userInfo">0 Follower. 0 Following. 0 Playlist</div>
                <div className="userShare">
                    <div className="penIcon">
                        <CreateIcon />
                    </div>
                     <ShareIcon/></div>
            </div>
        </div>
        <div className="userBottom">Create Playlists to view more content</div>
    </div>
  )
}

export default User