import React from 'react'

const MXTryMatrixNowSection = ({items}) => {
    return (
        <div className="mxblock">
        <div className="mxgrid mxgrid--discover">
        {items.map(function(project, i) {
            const language = project.frontmatter.language ? project.frontmatter.language
                .replace(/ /g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '-')
                .replace(/#/g, '-') : ""
            const maturity = project.frontmatter.maturity ?
            project.frontmatter.maturity.replace(/ /g, '') : ""
            const license  = project.frontmatter.license ?
            project.frontmatter.license
                .replace(/ /g, '')
                .replace(/\//g, '-')
                .replace(/\./g, '') : ""
            return (
        <div key={Math.random().toString()} className="mxgrid__item20 filterableProject"
            data-featured={project.frontmatter.featured}
            data-maturity={maturity}
            data-language={language}
            data-license={license}
            data-type={project.frontmatter.categories[0]}>
            <div className="mxgrid__item__bg mxgrid__item__bg--clear">
                
                <a href={project.fields.slug}><h4 className="mxgrid__item__bg__hx">{project.frontmatter.title}</h4></a>
                <p className="mxgrid__item__bg__p">{project.frontmatter.description}</p>
                {project.frontmatter.thumbnail &&
                <div className="mxgrid__item__bg__vert" style={{"minHeight": "100px","minWidth": "100px"}}>
                    <img src={project.frontmatter.thumbnail} alt="" className="mxgrid__item__bg__img" />
                </div>
                }
            </div>
        </div>)
        })}
        </div>
    </div>
)}
export default MXTryMatrixNowSection
