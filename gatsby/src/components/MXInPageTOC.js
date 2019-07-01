import React from 'react'

const MXInPageTOC = ({tableOfContents, i}) => {
    return (<div style={{backgroundColor: "#f4f4f4"}}>
        <ul>
        {tableOfContents.items.map(item => {
            var subitems;
            if (item.items) {
                subitems = (<ul>
                    {item.items.map(item =>{
                        return <li key={item.url}><a href={item.url}>{item.title}</a></li>
                    })}
                </ul>)
            }
            return(
                <li key={item.url}><a href={item.url}>{item.title}</a>
                {subitems}
                </li>
            )            
        })}
        </ul>
    </div>)
}
export default MXInPageTOC
