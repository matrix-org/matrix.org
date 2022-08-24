import React, { useState } from 'react'
import { graphql } from 'gatsby'

import { Layout, MXContentMain, MXProjectHeader } from '../components'
import config from '../../config'
import { MDXRenderer } from 'gatsby-plugin-mdx';

const title = `SDKs | ${config.siteTitle}`;

export function Head() {
  return (
    <title id="title">{title}</title>
  )
}

const SDKs = ({ data }) => {
  const sdks = data.allFile.edges.filter(s =>
    s.node.childMdx &&
    s.node.childMdx.frontmatter.categories &&
    s.node.childMdx.frontmatter.categories[0] === 'sdk' &&
    s.node.childMdx.frontmatter.maturity !== "Not actively maintained"
  ).map((edge => {
    var result = edge.node.childMdx.frontmatter;
    result.slug = edge.node.childMdx.fields.slug;
    result.body = edge.node.childMdx.body;
    return result;
  }));

  var [selected, setSelected] = useState(sdks.find(s => s.slug === ""));
  if (typeof window !== `undefined`) {
    var dvar;
      if (window.location.hash) {
        dvar = window.location.hash.replace('#', '');
      } else {
        dvar = "matrix-nio"
      }
    setImmediate(() => setSelected(sdks.find(s => s.slug === "/docs/projects/sdk/" + dvar)));
  }

  const clickHandler = (el) => {
    var sdk = el.target.dataset["sdk"];
    setSelected(sdks.find(s => s.slug === sdk));
    window.history.pushState(null, null, "#" + sdk.split("/")[4]);

    document.getElementById("sdk-content").scrollIntoView();
  };
  
  const selectItemRender = (sdk, i) => {
    var selectableItemStyle = {
      cursor: "pointer"
    };
    if (selected && sdk.slug === selected.slug) {
      selectableItemStyle.background = "#f4f4f4";
      selectableItemStyle.fontWeight = "bold";
    }
    return (
      <div style={selectableItemStyle}
        data-sdk={sdk.slug}
        key={"selector_" + sdk.slug}
        onClick={clickHandler}
        onKeyPress={clickHandler}
        role="button"
        tabIndex={i}>
        {sdk.title} <small data-sdk={sdk.slug}>({sdk.language})</small>
      </div>
    )
  }

  const languages = [
    ["Python", ["Python"]],
    ["JavaScript", ["JavaScript", "TypeScript"]],
    ["Go", ["Go"]],
    ["Rust", ["Rust"]],
    ["Ruby", ["Ruby"]],
    ["Java", ["Java"]],
    ["Objective-C", ["Objective-C"]],
    ["Dart", ["Dart"]],
    ["Perl", ["Perl"]],
    ["C/C++", ["C", "C++", "C++/Qt"]],
    ["Kotlin", ["Kotlin"]],
    [".NET", ["C#", ".NET"]]
  ]
  let flattened = []; // build server has no .flat()
  languages.map(l => l[1]).forEach(l => flattened = flattened.concat(l));
  return (<Layout titleOverride={title} navmode="discover"
    excerptOverride="Browse Matrix SDKs for various languages and platforms">
    <MXContentMain>
      <div className="mxgrid" id="sdk-content" style={{"paddingTop": "75px", "marginTop": "-75px"}}>
        <div className="mxgrid__item25">
          <h1 id="SDKs">SDKs</h1>
          {
            languages.map((l, j) => {
              return(<div key={l[0]}>
                <h3>{l[0]}</h3>
                {
            sdks
              .filter(s => s.featured)
              .filter(s => l[1].includes(s.language))
              .map((s, i) => selectItemRender(s, j*10 + i))}
                </div>);
            })
          }
          <h3>Other</h3>
          {
            sdks
              .filter(s => s.featured)
              .filter(s => !flattened.includes(s.language))
              .map((s, i) => selectItemRender(s, 200 + i))}
        </div>

        <div className="mxgrid__item75">{
          selected &&
          <div>
            <MXProjectHeader project={selected} imageSize={100} />
            <br clear="all" />
            <MDXRenderer>{selected.body}</MDXRenderer>
          </div>
        }
        </div>

      </div>

    </MXContentMain>
  </Layout>)
}


export const query = graphql`
{
    allFile(
      sort: {fields:childMdx___frontmatter___sort_order, order: ASC}
      filter: { sourceInstanceName: { eq: "projects" } }) {
        edges {
            node {
                childMdx {
                    frontmatter {
                        title
                        maturity
                        description
                        thumbnail
                        featured
                        categories
                        language
                        author
                        repo
                        room
                        e2e
                        slug
                        sort_order
                    }
                    fields {
                      slug
                    }
                    body
                }
            }
        }
    }
}
`
export default SDKs
