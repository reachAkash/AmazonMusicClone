import React from 'react'

function Button({children,className,style}) {
  console.log(style);
  return (
    <button style={style=='linear-gradient(90deg,#af57d2)'?'linear-gradient(135deg,#ef3945)':style} className={className}>{children}</button>
  )
}

export default Button