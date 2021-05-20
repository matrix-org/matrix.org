import React from 'react'

import Helmet from 'react-helmet'
import { Layout, MXContentMain } from '../components'
import config from '../../config'


const title = `Matrix Live | ${config.siteTitle}`;
const MatrixLive = () => {

    return (<Layout titleOverride={title} navmode="discover"
        excerptOverride="Browse Matrix hosting options">
        <MXContentMain>
            <Helmet title={title} />
            <h1 id="matrix-hosting">Matrix Live</h1>
            <div className="mxgrid">
                <div className="mxgrid__item50">
                    <h2 id="modularim">Matrix Live Video</h2>
                    <p>
                        <strong>
                        <a href="https://www.youtube.com/playlist?list=PLl5dnxRMP1hXZJtaE1Q3_ztrfIMJgrgZM" 
                            target="_blank" rel="noreferrer" >
                            Catch up and subscribe on our YouTube channel
                        </a>
                        </strong>
                    </p>
                    <p>
                        <img src="/blog/img/2020-06-26-ml.png" alt="Matrix Live" />
                    </p>
                    <p>
                        Every Friday we release a new episode of Matrix Live,
                        talking about the status of Matrix, happenings in the
                        ecosystem and more.
                    </p>
                    <p>
                        <strong>
                        <a href="https://www.youtube.com/playlist?list=PLl5dnxRMP1hXZJtaE1Q3_ztrfIMJgrgZM"
                            target="_blank" rel="noreferrer" >
                            Catch up and subscribe on our YouTube channel
                        </a>
                        </strong>
                    </p>
                </div>
                <div className="mxgrid__item50">
                    <h2 id="modularim">Matrix Live Podcast</h2>
                    <p>
                        You will know Matrix Live as a weekly video produced by the Matrix team and shared on YouTube. We are now offering the same content as an audio-only podcast, as a way of reaching more people. You can find the podcast:
                    </p>
                    <ul>
                        <li><a href="https://podcasts.apple.com/gb/podcast/matrix-live/id1498631706">On Apple Podcasts</a></li>
                        <li><a href="https://open.spotify.com/show/1SFrZPISzYs0elxlZUAvZ5?si=Xyns2Pl0RBuGBjuzH4yxsQ">On Spotify</a></li>
                        <li><a href="https://pca.st/uv1qytez">On Pocket Casts</a></li>
                        <li>or by <a href="https://feed.podbean.com/matrixlive/feed.xml">hitting the RSS feed directly</a></li>
                    </ul>
                </div>
                <h1>Open Tech Will Save Us</h1>
                <p>
                    New for 2020, <a href="/open-tech-will-save-us">Open Tech Will Save Us</a> is a virtual meetup, taking the 
                    form of a monthly live video stream broadcasting on the second Wednesday of every month at 5pm UTC.
                </p>
                <p>
                    We discuss issues relating to technology, especially the importance of Open, Interoperable standards,
                    and how they can enable decentralised tech to keep our data private while still enabling communication.
                </p>
                <p>
                    <strong><a href="/open-tech-will-save-us">
                        Find more detail on the dedicated Open Tech Will Save Us page
                    </a></strong>
                </p>
            </div>
        </MXContentMain>
    </Layout>)
}

export default MatrixLive
