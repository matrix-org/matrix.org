import React from 'react'

const MXContentNav = ({title, content, currentSlug, tableOfContents}) => {
    var navClass = "mxcontent__nav"
    if (currentSlug && currentSlug.indexOf("/docs") === 0) {
        navClass += " mxcontent__nav--left";
    }
    var tocRendered = false;
    return (
    <div className={navClass}>
        <h3>{title}</h3>
        <div className="mxcontent__nav__section">
        {
        content.map(p => {
            var itemClass = "mxcontent__nav__link";
            if (currentSlug === p.slug && currentSlug.indexOf("/docs") === 0) {
                itemClass += " mxcontent__nav__link--active";
                tocRendered = true;
                return (
                <div key={p.slug}>
                <div className="mxcontent__nav__section"></div>
                <div className="mxcontent__nav__section">
                    <div className={itemClass}>{p.title}</div>
                    {tableOfContents.items.map(tocItem => {
                        return (<div key={p.slug + tocItem.url} className="mxcontent__nav__link">
                            <a href={tocItem.url}>{tocItem.title}<br /></a>
                        </div>)
                    })}
                </div>
                </div>)
            } else {
                if (tocRendered) {
                    itemClass += " mxcontent__nav__link--last";
                }
                return <div key={p.slug} className={itemClass}>
                    <a href={p.slug}>{p.title}</a><br />
                </div>
            }
        })
        }
</div>
        {currentSlug && currentSlug.indexOf("/blog") === 0 && (
            <div>
                <div className="mxcontent__nav__link"><a href="/blog/archive">View all</a></div>
                <div className="mxcontent__nav__section mxcontent__nav__section--last">
                    <div className="mxcontent__nav__link"><a href="/blog/feed">RSS Feed</a><br /></div>
                </div>
            </div>)
        }
    </div>
)}
//
export default MXContentNav
