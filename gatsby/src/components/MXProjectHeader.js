import React from 'react'
import kebabCase from 'lodash/kebabCase'

const MXProjectHeader = ({ project, imageSize }) => {
    imageSize = imageSize ? imageSize : 100;
    return <div>
        <div style={{ "float": "left" }}>
            <img alt={project.title} src={project.thumbnail}
                style={
                    { "width": `${imageSize}px`, "height": `${imageSize}px`,
                    "padding": "20px" }} />
        </div>
        <div style={{ "float": "left", "marginRight": "20px" }}>
            <h3 id={"title-" + kebabCase(project.title)}>{project.title}</h3>
            <a href={project.repo}>{project.repo}</a><br />
            <a href={"https://matrix.to/#/" + project.room}>{project.room}</a><br />
            {project.example_mxid &&
                <div>
                    Example mxid: <a href={"https://matrix.to/#/" + project.example_mxid}>{project.example_mxid}</a>
                </div>
            }

        </div>
    </div>

}
export default MXProjectHeader