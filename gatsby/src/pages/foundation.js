/* eslint jsx-a11y/label-has-for:0 */

import React from 'react'
import Helmet from 'react-helmet'
import { Layout, MXContentMain} from '../components'

import config from '../../config'



const Foundation = () => {
    return (<Layout hasNavPadding="true" excerptOverride="The Foundation defines the manifesto, mission and values of the project, the open governance process that determines how the specification develops, and provides a safety-net to ensure the project stays independent and true to its goals.">
            <Helmet title={`The Matrix.org Foundation | ${config.siteTitle}`} />
            <MXContentMain>
            <div className="mxblock mxblock--foundation">
          <h1 className="mxblock--foundation__hx">The Matrix.org Foundation</h1>
          <h2>Introduction</h2>
          <p className="mxblock--foundation__p">
            The evolution of Matrix is managed through an open governance process, looked after by The Matrix.org
            Foundation - a non-profit UK Community Interest Company, incorporated to act as the neutral guardian of the
            standard on behalf of the whole Matrix community.
          </p>
          <p className="mxblock--foundation__p">
            The Foundation defines the manifesto, mission and values of the project, the open governance process that
            determines how the specification develops, and provides a safety-net to ensure the project stays independent
            and true to its goals.  The constitution of the project is defined in the Foundation’s legal Articles of
            Association and Rules, and is enforced by the Guardians of Matrix: the directors of the Foundation appointed
            to provide a balance of independent experts and the founding Matrix team to ensure the project stays on
            track.
          </p>

          <h2>The Guardians</h2>

          <p className="mxblock--foundation__p">
            The Guardians are the legal directors of the non-profit Foundation, and are responsible for ensuring that
            the Foundation (and by extension the Spec Core Team) keeps on mission and neutrally protects the development
            of Matrix. Guardians are typically independent of the commercial Matrix ecosystem and may even not be
            members of today’s Matrix community, but are deeply aligned with the mission of the project. Guardians are
            selected to be respected and trusted by the wider community to uphold the guiding principles of the
            Foundation and keep the other Guardians honest.
          </p>
          <p className="mxblock--foundation__p">
            In alphabetical order:
          </p>

          <div className="mxgrid mxgrid--guardians">
            <div className="mxgrid__item100">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--guardian">
                <img className="mxgrid__item--guardian__bg__img" alt="Prof. Jon Crowcroft" src="/images/guardians/crowcroft.jpg"/>
                <div className="mxgrid__item--guardian__content">
                  <h2 className="mxgrid__item--guardian__content__hx">Prof. Jon Crowcroft</h2>
                  <p className="mxgrid__item--guardian__content__p">
                    Jon Crowcroft is the Marconi Professor of Communications Systems in the Computer Lab at the
                    University of Cambridge, and the Turing Institute. Jon is a pioneer in the field of decentralised
                    communication, and a fellow of the Royal Society, the ACM, the British Computer Society, the
                    Institution of Engineering and Technology, the Royal Academy of Engineering and the Institute of
                    Electrical and Electronics Engineers. (He also supervised Matthew on building a pre-Matrix instant
                    messaging system at Cambridge, and complained that it wasn’t decentralised enough!)
                   </p>
                </div>
              </div>
            </div>
            <div className="mxgrid__item100">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--guardian mxgrid__item__bg--guardian--invert">
                <img className="mxgrid__item--guardian__bg__img" alt="Matthew Hodgson" src="/images/guardians/matthew.jpg"/>
                <div className="mxgrid__item--guardian__content mxgrid__item--guardian__content--invert">
                  <h2 className="mxgrid__item--guardian__content__hx">Matthew Hodgson</h2>
                  <p className="mxgrid__item--guardian__content__p">
                    Matthew is technical co-founder of Matrix, and CEO/CTO of New Vector - the company formed in 2017 to
                    let the core Matrix dev team work on Matrix full-time as their day job. He came up with the idea of
                    Matrix with Amandine in 2013 while they were running Amdocs’ Unified Communication unit. He has a
                    degree in Physics & Computer Science from the University of Cambridge.
                  </p>
                </div>
              </div>
            </div>
            <div className="mxgrid__item100">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--guardian">
                <img className="mxgrid__item--guardian__bg__img" alt="Amandine Le Pape" src="/images/guardians/amandine.jpg"/>
                <div className="mxgrid__item--guardian__content">
                  <h2 className="mxgrid__item--guardian__content__hx">Amandine Le Pape</h2>
                  <p className="mxgrid__item--guardian__content__p">
                    Amandine is co-founder of Matrix, and COO of New Vector. She previously
                    ran the business side of Amdocs’ UC unit with Matthew. She has an engineering degree in Telecoms,
                    Electronics and Computer Science and uses it most to translate the technicalities of Matrix to
                    humans and businesses, and make sure we keep the users at heart when making decisions!
                  </p>
                </div>
              </div>
            </div>
            <div className="mxgrid__item100">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--guardian mxgrid__item__bg--guardian--invert">
                <img className="mxgrid__item--guardian__bg__img" alt="Ross Schulman" src="/images/guardians/ross.jpg"/>
                <div className="mxgrid__item--guardian__content mxgrid__item--guardian__content--invert">
                  <h2 className="mxgrid__item--guardian__content__hx">Ross Schulman</h2>
                  <p className="mxgrid__item--guardian__content__p">
                    Ross Schulman is a senior counsel and senior policy technologist at New America’s Open Technology
                    Institute, where he focuses on internet measurement, emerging technologies, surveillance, and
                    decentralization. Prior to joining OTI, Ross worked for Google. Ross brings a unique perspective as
                    a tech- and decentralisation-savvy lawyer to the Foundation, as well as being one of the first
                    non-developers in the Matrix community to run his own homeserver. Ross has been known to walk around
                    Mozfest clutching a battery-powered Synapse in a box, promoting decentralised communication for all.
                  </p>
                </div>
              </div>
            </div>
            <div className="mxgrid__item100">
              <div className="mxgrid__item__bg mxgrid__item__bg--clear mxgrid__item__bg--guardian">
                <img className="mxgrid__item--guardian__bg__img" alt="Dr. Jutta Steiner" src="/images/guardians/jutta.jpg"/>
                <div className="mxgrid__item--guardian__content">
                  <h2 className="mxgrid__item--guardian__content__hx">Dr. Jutta Steiner</h2>
                  <p className="mxgrid__item--guardian__content__p">
                    As co-founder and CEO of Parity Technologies, Dr. Jutta Steiner is dedicated to building a better
                    internet - Web 3.0 - where users’ privacy & control come first. Parity Technologies is a leader in
                    the blockchain space – known to many as the creator of one of the most popular Ethereum clients, it
                    is also the creator of two ambitious new blockchain technlogies, Polkadot and Substrate, that make
                    it easier to experiment and innovate on scalability, encryption and governance.
                  </p>
                  <p className="mxgrid__item--guardian__content__p">
                    Parity Technologies have been pioneering Matrix enterprise use since the moment they decided to rely
                    on Matrix for their internal and external communication back in 2016 and now run their own
                    high-volume deployment, with end-to-end encryption enabled by default. Jutta represents
                    organisations who are professionally dependent on Matrix day-to-day, as well as bringing her unique
                    experiences around decentralisation and ensuring that Web 3.0 will be a fair web for all.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2>Legal details</h2>
          <ul>
            <li>The Matrix.org Foundation C.I.C is registered in the UK as Company #<a href=
              "https://beta.companieshouse.gov.uk/company/11648710">11648710</a>.</li>
            <li>The official articles of association of the Foundation may be
              downloaded <a href="/media/2019-06-10 - Matrix.org Foundation CIC Articles of Association.pdf">here</a>.</li>
            <li>The official Rules for the Foundation may be downloaded <a href="/media/2019-06-10 - Matrix.org Foundation CIC Rules.pdf">here</a>.</li>
            </ul>
            <h2>The Rules of the Foundation</h2>
            <p>The Foundation is governed by two sets of documents - its Articles of Association, which define its legal
              structure and processes, and its Rules, which define the scope and mechanisms of its day-to-day
              activity.</p>
            <p>The Rules were originally drafted through the open <a href=
              "https://matrix.org/docs/spec/proposals">Matrix Specification Change</a> proposal process in order
              to provide full transparency and review from the wider community. The result was <a href=
              "https://github.com/matrix-org/matrix-doc/pull/1779">MSC1779</a> - <a href=
              "https://github.com/matrix-org/matrix-doc/tree/master/proposals/1779-open-governance.md"> Proposal for
              Open Governance of Matrix.org</a> , providing a comprehensive overview of the whole governance
              process.</p>
          <p>The Proposal for Open Governance was then formalised into legal form and incorporated into the Articles of
            Association and a matching Rules document, which is canonically versioned in <a href=
            "https://docs.google.com/document/d/1MhqsuIUxPc7Vf_y8D250mKZlLeQS6E39DPY6Azpc2NY/edit"> this Google
            Doc</a> (for ease of use by lawyers). This is the official canonical version of the rulebook referred
            to by the Foundation’s Articles.</p>
          <p>The full history of the rules can be followed via:</p>
          <ul>
            <li><a href=
              "https://matrix.org/blog/2018/06/20/towards-open-governance-for-matrix-org">
            https://matrix.org/blog/2018/06/20/towards-open-governance-for-matrix-org</a></li>
            <li><a href=
            "https://github.com/matrix-org/matrix-doc/issues/1318">https://github.com/matrix-org/matrix-doc/issues/1318</a> (v1 proposal)</li>
            <li><a href=
              "https://matrix.org/blog/2018/10/29/introducing-the-matrix-org-foundation-part-1-of-2">
            https://matrix.org/blog/2018/10/29/introducing-the-matrix-org-foundation-part-1-of-2</a></li>
            <li><a href=
            "https://github.com/matrix-org/matrix-doc/pull/1779">https://github.com/matrix-org/matrix-doc/pull/1779</a></li>
          </ul>
          <p>One of the most important items defined in the Rules are The Guiding Principles of the project and the
            definition of the Spec Core Team, which are reproduced below from MSC1779 for ease of reference.</p>

          <h2>Matrix Manifesto</h2>

          <p>We believe:</p>
          <ul>
            <li>People should have full control over their own
            communication.</li>
            <li>People should not be locked into centralised communication
              silos, but instead be free to pick who they choose to host their
            communication without limiting who they can reach.</li>
            <li>The ability to converse securely and privately is a basic human
            right.</li>
            <li>Communication should be available to everyone as a free and
            open, unencumbered, standard and global network.</li>
          </ul>

          <h2>Mission</h2>
          <p>The Matrix.org Foundation exists to act as a neutral custodian
            for Matrix and to nurture it as efficiently as possible as a single
            unfragmented standard, for the greater benefit of the whole
            ecosystem, not benefiting or privileging any single player or
          subset of players.</p>
          <p>For clarity: the Matrix ecosystem is defined as anyone who uses
          the Matrix protocol. This includes (non-exhaustively):</p>
          <ul>
            <li>End-users of Matrix clients.</li>
            <li>Matrix client developers and testers.</li>
            <li>Spec developers.</li>
            <li>Server admins.</li>
            <li>Matrix packagers & maintainers.</li>
            <li>Companies building products or services on Matrix.</li>
            <li>Bridge developers.</li>
            <li>Bot developers.</li>
            <li>Widget developers.</li>
            <li>Server developers.</li>
            <li>Matrix room and community moderators.</li>
            <li>End-users who are using Matrix indirectly via bridges.</li>
            <li>External systems which are bridged into Matrix.</li>
            <li>Anyone using Matrix for data communications.</li>
          </ul>
          <p>"Greater benefit" is defined as maximising:</p>
          <ul>
            <li>the number of Matrix-native end-users reachable on the open
            Matrix network.</li>
            <li>the number of regular users on the Matrix network (e.g. 30-day
            retained federated users).</li>
            <li>the number of online servers in the open federation.</li>
            <li>the number of developers building on Matrix.</li>
            <li>the number of independent implementations which use
            Matrix.</li>
            <li>the number of bridged end-users reachable on the open Matrix
            network.</li>
            <li>the signal-to-noise ratio of the content on the open Matrix
            network (i.e. minimising spam).</li>
            <li>the ability for users to discover content on their terms
            (empowering them to select what to see and what not to see).</li>
            <li>the quality and utility of the Matrix spec (as defined by ease
              and ability with which a developer can implement spec-compliant
              clients, servers, bots, bridges, and other integrations without
            needing to refer to any other external material).</li>
          </ul>
          <p>N.B. that we consider success to be the growth of the open
            federated network rather than closed deployments. For example, if
            WhatsApp adopted Matrix it wouldn’t be a complete win unless they
          openly federated with the rest of the Matrix network.</p>

          <h2>Values</h2>
          <p>As Matrix evolves, it's critical that the Spec Core Team and
            Guardians are aligned on the overall philosophy of the project,
            particularly in more subjective areas. The values we follow
          are:</p>
          <ul>
            <li>Supporting the whole long-term ecosystem rather than individual
            stakeholder gain.</li>
            <li>Openness rather than proprietary lock-in.</li>
            <li>Interoperability rather than fragmentation.</li>
            <li>Cross-platform rather than platform-specific.</li>
            <li>Collaboration rather than competition.</li>
            <li>Accessibility rather than elitism.</li>
            <li>Transparency rather than stealth.</li>
            <li>Empathy rather than contrariness.</li>
            <li>Pragmatism rather than perfection.</li>
            <li>Proof rather than conjecture.</li>
          </ul>
          <p>Patent encumbered IP is strictly prohibited from being added to
          the standard.</p>
          <p>Making the specification rely on non-standard/unspecified
            behaviour of other systems or actors (such as SaaS services, even
            open-sourced, not governed by a standard protocol) shall not be
          accepted, either.</p>

          <h2>The Spec Core Team</h2>
          <p>The contents and direction of the Matrix Spec is governed by the
            Spec Core Team; a set of experts from across the whole Matrix
            community, representing all aspects of the Matrix ecosystem. The
          Spec Core Team acts as a subcommittee of the Foundation.</p>
          <p>Members of the Spec Core Team pledge to act as a neutral
            custodian for Matrix on behalf of the whole ecosystem and uphold
            the Guiding Principles of the project as outlined above. In
            particular, they agree to drive the adoption of Matrix as a single
            global federation, an open standard unencumbered from any
            proprietary IP or software patents, minimising fragmentation
            (whilst encouraging experimentation), evolving rapidly, and
            prioritising the long-term success and growth of the overall
          network over individual commercial concerns.</p>
          <p>Spec Core Team members need to have significant proven domain
            experience/skill and have had clear dedication and commitment to
            the project and community for &gt;6 months. (In future, once we
            have subteams a la Rust, folks need to have proven themselves there
          first).</p>
          <p>Members need to demonstrate ability to work constructively with
            the rest of the team; we want participation in the Spec Core Team
            to be an efficient, pleasant and productive place, even in the face
            of inevitable disagreement. We do not want a toxic culture of
            bullying or competitive infighting. Folks need to be able to
            compromise; we are not building a culture of folks pushing their
          personal agendas at the expense of the overall project.</p>
          <p>The team should be particularly vigilant against 'trojan horse'
            additions to the spec - features which only benefit particular
            players, or are designed to somehow cripple or fragment the open
            protocol and ecosystem in favour of competitive advantage.
            Commercial players are of course free to build proprietary
            implementations, or use custom event types, or even custom API
            extensions (e.g. more efficient network transports) - but
            implementations must fall back to interoperating correctly with the
          rest of the ecosystem.</p>
          <p>The current Spec Core Team (and their domain areas) is:</p>
          <ul>
            <li><a href="https://github.com/ara4n">Matthew Hodgson</a> (Lead, Guardian)</li>
            <li><a href="https://github.com/erikjohnston">Erik Johnston</a> (Servers)</li>
            <li><a href="https://github.com/richvdh">Richard van der Hoff</a> (Servers, Cryptography)</li>
            <li><a href="https://github.com/dbkr">David Baker</a> (Clients, IS API, Push API, Media)</li>
            <li><a href="https://github.com/uhoreg">Hubert Chathi</a> (Cryptography, General)</li>
            <li><a href="https://github.com/anoadragon453">Andrew Morgan</a> (Servers, AS API, Spec Process)</li>
            <li><a href="https://github.com/turt2live">Travis Ralston</a> (Bots and Bridges & AS API, Media)</li>
            <li><a href="https://github.com/KitsuneRal">Alexey Rusakov</a> (Clients on behalf of Community)</li>
          </ul>

        </div>
            </MXContentMain>
    </Layout>)
}

export default Foundation
