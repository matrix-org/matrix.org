import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Content = styled.section`
  padding: 1rem 0rem;
  margin-top: -1rem;
`


const HallOfFameEntry = ({ date, who, profile, description, service }) => (
    <Content>
    <section>
        <div><i>{date} - {service} - <a href={profile}>{who}</a></i></div>
        <div dangerouslySetInnerHTML={{__html: description}}/>
    </section>
    </Content>

)

export default HallOfFameEntry

HallOfFameEntry.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  who: PropTypes.string.isRequired,
  profile: PropTypes.string,
  service: PropTypes.string.isRequired,
}