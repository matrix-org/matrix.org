import React from 'react'

const MXGuidesNav = ({ title, pagesBySection, currentSlug, tableOfContents, pagesListTitle }) => {
    var navClass = "mxcontent__nav"
    if (currentSlug && currentSlug.indexOf("/docs") === 0) {
        navClass += " mxcontent__nav--left";
    }
    return (
        <div className={navClass}>
            <div className="mxcontent__nav__section">
            <h3>Contents</h3>
                {tableOfContents && tableOfContents.items.map(tocItem => {
                    return (<div key={tocItem.url} className="mxcontent__nav__link">
                        <a href={tocItem.url}>{tocItem.title}<br /></a>
                    </div>)
                })}
                <hr />
            <h3>{pagesListTitle}</h3>
                {pagesBySection &&
                    Object.keys(pagesBySection).map(section => {
                        return <div key={section}>
                            <h4>{section}</h4>
                            {pagesBySection[section].map(p => {
                                return <div key={p.slug} className="mxcontent__nav__link">
                                    <a href={p.slug}>{p.title}</a><br />
                                </div>
                            })
                            }
                        </div>
                    })
                }
            </div>
            {currentSlug && currentSlug.indexOf("/blog") === 0 && title === "All Posts" && (
                <div>
                    <div className="mxcontent__nav__link"><a href="/blog/archive">View all</a></div>
                    <div className="mxcontent__nav__section mxcontent__nav__section--last">
                        <div className="mxcontent__nav__link"><a href="/blog/feed">RSS Feed</a><br /></div>
                    </div>
                </div>)
            }
        </div>
    )
}
//
export default MXGuidesNav
