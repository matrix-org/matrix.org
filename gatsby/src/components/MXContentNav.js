import React from 'react'

const MXContentNav = ({title, content, currentSlug}) => {
    var navClass = "mxcontent__nav"
    if (currentSlug.indexOf("/docs") === 0) {
        navClass += " mxcontent__nav--left";
    }
    return (
    <div class={navClass}>
        <h3>{title}</h3>
        {
        content.map(p => {
            var itemClass = "mxcontent__nav__link";
            var active = currentSlug === p.slug ? " mxcontent__nav__link--active" : "";
            itemClass = itemClass + active;
            return <div class={itemClass}>
                <a href={p.slug}>{p.title}</a>
            </div>
        })
        }
    </div>
)}

export default MXContentNav
