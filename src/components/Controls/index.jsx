import React from 'react'
import PropTypes from 'prop-types'
import Toggle from './Toggle'
import ZoomIn from './ZoomIn'
import ZoomOut from './ZoomOut'
import styles from './index.less'

const Controls = ({ isOpen = true, toggleOpen, zoomIn, zoomOut, zoom, zoomMin, zoomMax }) => (
  <div className={styles.rtControls}>
    <div className={styles.rtControlsContent}>
      {toggleOpen && <Toggle isOpen={isOpen} toggleOpen={toggleOpen} />}
      {zoomIn && <ZoomIn zoomIn={zoomIn} zoomMax={zoomMax} zoom={zoom} />}
      {zoomOut && <ZoomOut zoomOut={zoomOut} zoomMin={zoomMin} zoom={zoom} />}
    </div>
  </div>
)

Controls.propTypes = {
  zoom: PropTypes.number.isRequired,
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func,
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func,
  zoomMin: PropTypes.number,
  zoomMax: PropTypes.number,
}

export default Controls
