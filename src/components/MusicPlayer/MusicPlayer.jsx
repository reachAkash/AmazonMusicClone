import React from 'react'

function MusicPlayer() {
  return (
      
    <div className='musicPlayerContainer'>
        <div className='musicLeft'>
            <img className='musicLogo' src={'https://th.bing.com/th/id/OIG.lVXjWwlHyIo4QdjnC1YE'} />
            <div className='musicDetails'>
                <h3>{data.title}</h3>
                <p>{description}</p>
                <h3>data.title</h3>
                <p>description</p>
            </div>
        </div>
        <div className='musicMiddle'>
            <div className='musicPlayerIcons'>
            <SkipPreviousIcon style={{fontSize:'2rem',cursor: 'pointer'}}/>
            <Replay10Icon style={{fontSize:'2rem',cursor: 'pointer'}}/>
            {/* {!play ?  */}
            <PlayArrowIcon style={{fontSize:'4rem',cursor: 'pointer'}} onClick={handlePlay}/>
            {/* :  */}
            {/* <PauseIcon style={{fontSize:'4rem',cursor: 'pointer'}} onClick={handlePlay}/> */}
            {/* } */}
            <Forward10Icon style={{fontSize:'2rem',cursor: 'pointer'}}/>
            <SkipNextIcon style={{fontSize:'2rem',cursor: 'pointer'}}/>
            </div>
        </div>
        <div className='musicRight'>
            <VolumeUpIcon style={{fontSize:'2rem'}}/>
        </div>
    </div>

  )
}

export default MusicPlayer