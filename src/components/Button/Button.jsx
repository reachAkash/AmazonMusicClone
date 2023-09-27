import React from 'react'

function Button({children,className,onClick,style,id}) {

  return (
    <button onClick={onClick} id={id} style={style=='linear-gradient(90deg,#af57d2)'?'linear-gradient(135deg,#ef3945)':style} className={className}>{children}</button>
  )
}

export default Button