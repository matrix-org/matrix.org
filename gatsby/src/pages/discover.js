import React from 'react'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../components'
import config from '../../config'

const Discover = () => {

    return (<Layout navmode="discover">
        <MXContentMain>
            <Helmet title={`Discover Matrix | ${config.siteTitle}`} />
            <h2 className="mxblock__hx">Discover Matrix</h2>
            <div className="mxgrid">
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/music_play_button.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/docs/guides/introduction">Introduction</a></h4>
                            <p className="mxgrid__item__bg__p">How to get started with Matrix<br /></p>
                        </div>
                    </div>
                </div>
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_spread_text.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/docs/guides">Guides</a></h4>
                            <p className="mxgrid__item__bg__p">Guides to usage of Matrix<br /></p>
                        </div>
                    </div>
                </div>
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_server_upload.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/docs/guides/installing-synapse">Synapse Installation</a></h4>
                            <p className="mxgrid__item__bg__p">Installing Synapse, a homeserver implementation written in Python<br /></p>
                        </div>
                    </div>
                </div>
                
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_spread_text.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/docs/develop">Guides for Developers</a></h4>
                            <p className="mxgrid__item__bg__p">How to develop for Matrix<br /></p>
                        </div>
                    </div>
                </div>
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_signs.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/faq/">FAQ</a></h4>
                            <p className="mxgrid__item__bg__p">Matrix FAQ<br /></p>
                        </div>
                    </div>
                </div>


                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_elaboration_message_happy.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/docs/guides/moderation">Moderation</a></h4>
                            <p className="mxgrid__item__bg__p">How to manage and moderate Matrix rooms<br /></p>
                        </div>
                    </div>
                </div>
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_spread_text.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="https://matrix.org/docs/spec">Spec</a></h4>
                            <p className="mxgrid__item__bg__p">The Matrix Specification<br /></p>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="mxblock__hx">Find Projects</h2>
            <div className="mxgrid">
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/software_layout_header_sideleft.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/clients">Clients</a></h4>
                            <p className="mxgrid__item__bg__p">Find a Matrix Client for you<br /></p>
                        </div>
                    </div>
                </div>
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_share.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/bridges/">Bridges</a></h4>
                            <p className="mxgrid__item__bg__p">Bridge to platforms outside Matrix<br /></p>
                        </div>
                    </div>
                </div>
                <div className="mxgrid__item33 mxgrid__item33--discover mxgrid__item33--bullet">
                    <div className="mxgrid__item__bg mxgrid__item__bg--develop">
                        <img src="/images/basic_elaboration_message_happy.svg" alt="" className="mxgrid__item__bg__img mxgrid__item__bg__img--develop" />
                        <div className="mxgrid__item__bg__vert mxgrid__item__bg__vert--develop">
                            <h4 className="mxgrid__item__bg__hx mxgrid__item__bg__hx--develop"><a href="/docs/projects/try-matrix-now">Try Matrix Now</a></h4>
                            <p className="mxgrid__item__bg__p">Find a comprehensive list of Matrix-related projects<br /></p>
                        </div>
                    </div>
                </div>

            </div>
        </MXContentMain>
    </Layout>)
}

export default Discover
