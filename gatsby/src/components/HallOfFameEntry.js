import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Content = styled.section`
  padding: 1rem 0rem;
  margin-top: -1rem;
`


const HallOfFameEntry = ({ date, who, profile, description, company, companyUrl, service }) => {
  const companyLink = company ? (<span> - <a href={companyUrl}>{company}</a></span>) : '';
  return (
    <Content>
    <section>
        <div><i>{date} - {service} - <a href={profile}>{who}</a>{companyLink}</i></div>
        <div dangerouslySetInnerHTML={{__html: description}}/>
    </section>
    </Content>
  );
}

export default HallOfFameEntry

HallOfFameEntry.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  who: PropTypes.string.isRequired,
  profile: PropTypes.string,
  company: PropTypes.string,
  companyUrl: PropTypes.string,
  service: PropTypes.string.isRequired,
}
