import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import { Layout, MXContentMain } from '../components'

const Title = styled.h1`
`

const PostContent = styled.div`
`

const Page = ({ pageContext: { postNode } }) => {
  const post = postNode.frontmatter
  const title = "Open Tech Will Save Us #" + post.edition;

  return (
        <Layout hasNavPadding="true" excerptOverride="Open Tech Will Save Us is a virtual meetup, taking the form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC"
  titleOverride={title} imageOverride={postNode.image}>
        <MXContentMain>
          <div class="mxcontent__main__doc">
            <Title>{title}</Title>
            <PostContent>
            <div class="gatsby-resp-iframe-wrapper" style={{"padding-bottom": "56.25%", "position": "relative", "height": "0px", "overflow": "hidden"}}>
              <iframe title={post.youtube} style={{"position": "absolute", "top": "0px", "left": "0px", "width": "100%", "height": "100%"}} src={post.youtube} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
              <MDXRenderer>{postNode.body}</MDXRenderer>
            </PostContent>
          </div>
        </MXContentMain>
    </Layout>
  )
}

export default Page

Page.propTypes = {
  pageContext: PropTypes.shape({
    postNode: PropTypes.object.isRequired,
  }),
}

Page.defaultProps = {
  pageContext: PropTypes.shape({  }),
}