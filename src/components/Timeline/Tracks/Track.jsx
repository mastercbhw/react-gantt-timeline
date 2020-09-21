import React from 'react'
import PropTypes from 'prop-types'

import Tracks from '.'
import Element from './Element'
import styles from './index.less'

const Track = ({ time, elements, isOpen, tracks, clickElement }) => (
  <div className={styles.trTrack}>
    <div className={styles.rtTrackElements}>
      {elements
        .filter(({ start, end }) => end > start)
        .map(element => (
          <Element key={element.id} time={time} clickElement={clickElement} {...element} />
        ))}
    </div>
    {isOpen && tracks && tracks.length > 0 && <Tracks time={time} tracks={tracks} clickElement={clickElement} />}
  </div>
)

Track.propTypes = {
  time: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool,
  elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  clickElement: PropTypes.func,
}

Track.defaultProps = {
  clickElement: undefined,
}

export default Track
