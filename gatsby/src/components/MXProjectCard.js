import React from 'react'
const MXProjectCard = ({ client }) => {
    return <div className="mxclientcard">
        <h3><a href={client.slug}>{client.title}</a></h3>
        <a href={client.slug}>
            <img src={client.thumbnail} style={{ "max-width": "300px", "max-height": "300px" }} />
        </a><br />
        {client.description}
    </div>
}
export default MXProjectCard