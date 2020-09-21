import React from 'react'
import PropTypes from 'prop-types'

import Tracks from './Tracks'
import Grid from './Grid'
import styles from './index.less'

const Body = ({ time, grid, tracks, clickElement }) => (
  <div className={styles.rtTimelineBody}>
    {grid && <Grid time={time} grid={grid} />}
    <Tracks time={time} tracks={tracks} clickElement={clickElement} />
  </div>
)

Body.propTypes = {
  time: PropTypes.shape({}).isRequired,
  grid: PropTypes.arrayOf(PropTypes.shape({})),
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  clickElement: PropTypes.func,
}

export default Body
