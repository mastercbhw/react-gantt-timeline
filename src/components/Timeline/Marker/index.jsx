import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'
import cls from 'classnames'


const Marker = ({ x, modifier, children, visible, highlighted }) => (
  <div
    className={cls(
      styles.rtMarker,
      styles[`rtMarker${modifier}`],
      {
        [styles.rtIsVisible]: visible,
        [styles.rtIsHighlighted]: highlighted,
      })
    }
    style={{ left: `${x}px` }}
  >
    <div className="rt-marker__label">
      <div className="rt-marker__content">{children}</div>
    </div>
  </div>
)

Marker.propTypes = {
  x: PropTypes.number.isRequired,
  modifier: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  highlighted: PropTypes.bool,
  children: PropTypes.node,
}

export default Marker
