import React from 'react'
import PropTypes from 'prop-types'


const HallOfFameEntry = ({ date, description }) => (
    <div><div>{date}</div><div>{description}</div></div>
)

export default HallOfFameEntry

HallOfFameEntry.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
