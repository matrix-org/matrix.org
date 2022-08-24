import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Subline from "./Subline";

const Title = styled.h1`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
  a {
    color: ${props => props.theme.colors.grey.dark};
    &:hover {
      color: ${props => props.theme.colors.primaryLight};
    }
  }
`;

const PostContent = styled.div`
  margin-top: 1rem;
`;

const LineBreak = styled.div`
  height: 2px;
  margin: 4rem;
  background-color: rgba(1, 1, 1, 0.1);
`;

const Article = ({
  title,
  date,
  excerpt,
  slug,
  timeToRead,
  categories,
  body,
  author
}) => (
  <div className="mxcontent__main__post">
    <Title>
      <Link to={slug}>{title}</Link>
    </Title>
    <Subline>
      {date} &mdash;&nbsp;
      {categories.map((cat, i) => (
        <React.Fragment key={cat}>
          {!!i && ", "}
          <Link to={`/blog/category/${kebabCase(cat)}`}>{cat}</Link>
        </React.Fragment>
      ))}{" "}
      &mdash;&nbsp;
      {author}
    </Subline>
    <PostContent>
      <MDXRenderer>{body}</MDXRenderer>
    </PostContent>
    <LineBreak />
  </div>
);

export default Article;

Article.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  timeToRead: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  body: PropTypes.string.isRequired
};
