import React, { useState, } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Body from './Body'
import NowMarker from './Marker/Now'
import PointerMarker from './Marker/Pointer'
import getMouseX from '@/utils/getMouseX'
import getGrid from '@/utils/getGrid'
import styles from './index.less'


function Timeline(props) {
  const { now, time, timebar, tracks, sticky, clickElement } = props

  const [pointerDate, setPointerDate] = useState(null)
  const [pointerVisible, setpointerVisible] = useState(false)
  const [pointerHighlighted, setPointerHighlighted] = useState(false)

  const grid = getGrid(timebar)

  const handleMouseMove = e => {
    setPointerDate(time.fromX(getMouseX(e)))
  }

  const handleMouseLeave = () => {
    setPointerHighlighted(false)
  }

  const handleMouseEnter = () => {
    setpointerVisible(true)
    setPointerHighlighted(true)
  }


  return (
    <div className={styles.rtTimeline} style={{ width: time?.timelineWidthStyle }}>
      {now && <NowMarker now={now} visible time={time} />}
      {pointerDate && (
        <PointerMarker date={pointerDate} time={time} visible={pointerVisible} highlighted={pointerHighlighted} />
      )}
      <Header
        time={time}
        timebar={timebar}
        onMove={handleMouseMove}
        onEnter={handleMouseEnter}
        onLeave={handleMouseLeave}
        width={time?.timelineWidthStyle}
        sticky={sticky}
      />
      <Body time={time} grid={grid} tracks={tracks} clickElement={clickElement} />
    </div>
  )
}

Timeline.propTypes = {
  now: PropTypes.instanceOf(Date),
  time: PropTypes.shape({
    fromX: PropTypes.func.isRequired,
    toStyleLeftAndWidth: PropTypes.func,
    timelineWidthStyle: PropTypes.string,
  }).isRequired,
  timebar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
  sticky: PropTypes.shape({}),
  clickElement: PropTypes.func,
}

export default Timeline
