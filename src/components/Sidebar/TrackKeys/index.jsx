
import React from 'react'
import PropTypes from 'prop-types'
import TrackKey from './TrackKey'
import styles from './index.less'

const TrackKeys = ({ tracks, toggleOpen, clickTrackButton }) => (
  <ul className={styles.rtTrackKeys}>
    {tracks.map(track => (
      <TrackKey key={track.id} track={track} toggleOpen={toggleOpen} clickTrackButton={clickTrackButton} />
    ))}
  </ul>
)

TrackKeys.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  toggleOpen: PropTypes.func,
  clickTrackButton: PropTypes.func,
}

export default TrackKeys
