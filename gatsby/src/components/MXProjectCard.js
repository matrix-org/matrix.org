import React from 'react'
const MXProjectCard = ({ project, imageSize }) => {
    imageSize = imageSize ? imageSize : 300;
    return <div className="mxclientcard">
        <h3><a href={project.slug}>{project.title}</a></h3>
        {project.categories && project.categories[0] === "bot" && <>
        <small>{project.language}</small>
        <br />
        </>}
        {project.thumbnail && <a href={project.slug}>
            <img alt={project.title} src={project.thumbnail}
            style={{ "maxWidth": `${imageSize}px`, "maxHeight": `${imageSize}px` }} />
        </a>}
        <br />
        {project.description}
        {project.example_mxid &&
            <div>
                Example mxid: <a href={"https://matrix.to/#/"+project.example_mxid}>{project.example_mxid}</a>
            </div>
        }
    </div>
}
export default MXProjectCard