import React from 'react'

const MXContentMain = ({children,  hasSideNavigation}) => {
    
  const mxContentMainClass = "mxcontent__main" + (hasSideNavigation === "true" ?  " mxcontent__main--docs" : "")
return (
    <div className={mxContentMainClass}>{children}</div>
)}

export default MXContentMain
