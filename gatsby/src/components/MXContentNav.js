import React from 'react'

const MXContentNav = ({title, content, currentSlug, tableOfContents}) => {
    var navClass = "mxcontent__nav"
    if (currentSlug && currentSlug.indexOf("/docs") === 0) {
        navClass += " mxcontent__nav--left";
    }
    var tocRendered = false;
    return (
    <div class={navClass}>
        <h3>{title}</h3>
        {
        content.map(p => {
            var itemClass = "mxcontent__nav__link mxcontent__nav__link--title";
            if (currentSlug === p.slug && currentSlug.indexOf("/docs") === 0) {
                itemClass += " mxcontent__nav__link--active";
                tocRendered = true;
                return (
                <div>
                <div class="mxcontent__nav__section"></div>
                <div class="mxcontent__nav__section">
                    <div class={itemClass}>{p.title}</div>
                    {tableOfContents.items.map(tocItem => {
                        return (<div class="mxcontent__nav__link">
                            <a href={tocItem.url}>{tocItem.title}<br /></a>
                        </div>)
                    })}
                </div>
                </div>)
            } else {
                if (tocRendered) {
                    itemClass += " mxcontent__nav__link--last";
                }
                return <div class={itemClass}>
                    <a href={p.slug}>{p.title}</a><br />
                </div>
            }
        })
        }
    </div>
)}
//<div class="mxcontent__nav__link mxcontent__nav__link--title">Getting involved<br></div>
export default MXContentNav
