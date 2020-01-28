import React from 'react'
const MXProjectCard = ({ project, imageSize }) => {
    imageSize = imageSize ? imageSize : 300;
    return <div className="mxclientcard">
        <h3><a href={project.slug}>{project.title}</a></h3>
        <a href={project.slug}>
            <img src={project.thumbnail}
            style={{ "max-width": `${imageSize}px`, "max-height": `${imageSize}px` }} />
        </a><br />
        {project.description}
    </div>
}
export default MXProjectCard