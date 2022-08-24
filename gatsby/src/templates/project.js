import React from "react";

import { Layout, SEO, MXContentMain } from "../components";

const Project = ({ pageContext: { postNode }, children }) => {
  const post = postNode.frontmatter;

  return (
    <Layout navmode="discover" customSEO>
      <SEO
        postPath={postNode.fields.slug}
        postNode={postNode}
        article
        excerptOverride={post.description}
      />
      <MXContentMain>
        <div className="mxblock mxblock--project">
          <h1 className="mxblock--project__hx">{post.title}</h1>
          <div className="mxblock--project__content">
            <div
              className="mxblock--project__content__img"
              hidden={!post.screenshot}
            >
              <img
                src={post.screenshot}
                width="1120"
                alt=""
                className="mxblock--project__img"
              />
            </div>
            <div className="mxblock--project__content__info">
              <div className="mxblock--project__content__info__row">
                <div className="mxblock--project__content__info__row__b">
                  <p>Name</p>
                </div>
                <div className="mxblock--project__content__info__row__p">
                  <p>{post.title}</p>
                </div>
              </div>
              <div className="mxblock--project__content__info__row">
                <div className="mxblock--project__content__info__row__b">
                  <p>Description</p>
                </div>
                <div className="mxblock--project__content__info__row__p">
                  <p>{post.description}</p>
                </div>
              </div>
              <div className="mxblock--project__content__info__row">
                <div className="mxblock--project__content__info__row__b">
                  <p>Author</p>
                </div>
                <div className="mxblock--project__content__info__row__p">
                  <p>
                    {post.author}
                    <br />
                  </p>
                </div>
              </div>
              <div className="mxblock--project__content__info__row">
                <div className="mxblock--project__content__info__row__b">
                  <p>Maturity</p>
                </div>
                <div className="mxblock--project__content__info__row__p">
                  <p>{post.maturity}</p>
                </div>
              </div>
              <div className="mxblock--project__content__info__row">
                <div className="mxblock--project__content__info__row__b">
                  <p>Language</p>
                </div>
                <div className="mxblock--project__content__info__row__p">
                  <p>{post.language}</p>
                </div>
              </div>
              <div className="mxblock--project__content__info__row">
                <div className="mxblock--project__content__info__row__b">
                  <p>License</p>
                </div>
                <div className="mxblock--project__content__info__row__p">
                  <p>{post.license}</p>
                </div>
              </div>
              <div className="mxblock--project__content__info__row">
                <div className="mxblock--project__content__info__row__b">
                  <p>Repo</p>
                </div>
                <div className="mxblock--project__content__info__row__p">
                  <p>
                    <a href={post.repo}>{post.repo}</a>
                    <br />
                  </p>
                </div>
              </div>
              {post.home && (
                <div className="mxblock--project__content__info__row">
                  <div className="mxblock--project__content__info__row__b">
                    <p>Homepage</p>
                  </div>
                  <div className="mxblock--project__content__info__row__p">
                    <p>
                      <a href={post.home}>{post.home}</a>
                      <br />
                    </p>
                  </div>
                </div>
              )}
              {post.room && (
                <div className="mxblock--project__content__info__row">
                  <div className="mxblock--project__content__info__row__b">
                    <p>Matrix Room</p>
                  </div>
                  <div className="mxblock--project__content__info__row__p">
                    <p>
                      <a href={"https://matrix.to/#/" + post.room}>
                        {post.room}
                      </a>
                      <br />
                    </p>
                  </div>
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </MXContentMain>
    </Layout>
  );
};

export default Project;
