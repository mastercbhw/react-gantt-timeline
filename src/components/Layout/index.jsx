import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Sidebar from '../Sidebar'
import Timeline from '../Timeline'
import { addListener, removeListener } from '@/utils/events'
import raf from '@/utils/raf'
import getNumericPropertyValue from '@/utils/getNumericPropertyValue'
import styles from './index.less'
import cls from 'classnames'


const noop = () => { }

function Layout(props) {
  const {
    time,
    scrollToNow,
    now,
    enableSticky,
    isOpen,
    tracks,
    timebar,
    toggleTrackOpen,
    sidebarWidth,
    timelineViewportWidth,
    clickElement,
    clickTrackButton,
    onLayoutChange
  } = props


  const timeline = useRef()
  const layout = useRef()
  const sidebar = useRef()

  const [isSticky, setIsSticky] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const tScrollToNow = () => {
    if (scrollToNow) {
      timeline.current.scrollLeft = time.toX(now) - 0.5 * timelineViewportWidth
    }
  }

  const updateTimelineBodyScroll = () => {
    timeline.current.scrollLeft = scrollLeft
  }


  const updateTimelineHeaderScroll = () => {
    const { scrollLeft } = timeline.current
    setScrollLeft(scrollLeft)
  }

  const handleHeaderScrollY = scrollLeft => {
    raf(() => {
      setScrollLeft(scrollLeft)
    })
  }


  const handleScrollY = () => {
    raf(() => {
      const markerHeight = 0
      const { top, bottom } = timeline.current.getBoundingClientRect()
      const isSticky = top <= -markerHeight && bottom >= headerHeight
      setIsSticky(isSticky)
    })
  }

  const handleScrollX = () => {
    raf(updateTimelineHeaderScroll)
  }


  const calculateSidebarWidth = () => sidebar.current.offsetWidth + getNumericPropertyValue(layout.current, 'margin-left')

  const calculateTimelineViewportWidth = () => timeline.current.offsetWidth

  const handleLayoutChange = cb => {

    const nextSidebarWidth = calculateSidebarWidth()
    const nextTimelineViewportWidth = calculateTimelineViewportWidth()
    if (nextSidebarWidth !== sidebarWidth || nextTimelineViewportWidth !== timelineViewportWidth) {
      onLayoutChange(
        {
          sidebarWidth: calculateSidebarWidth(),
          timelineViewportWidth: calculateTimelineViewportWidth(),
        },
        cb
      )
    }
  }


  const handleResize = () => handleLayoutChange()



  useEffect(() => {
    if (enableSticky) {
      addListener('scroll', handleScrollY)
      updateTimelineHeaderScroll()
      updateTimelineBodyScroll()
    }

    addListener('resize', handleResize)
    handleLayoutChange(() => tScrollToNow())
    return () => {
      if (enableSticky) {
        removeListener('scroll', handleScrollY)
        removeListener('resize', handleResize)
      }
    }
  }, [])




  return (
    <div className={cls(styles.rcLayout, { [styles.rtIsOpen]: isOpen })} ref={layout}>
      <div className={styles.rtLayoutSide} ref={sidebar}>
        <Sidebar
          timebar={timebar}
          tracks={tracks}
          toggleTrackOpen={toggleTrackOpen}
          sticky={{ isSticky, headerHeight, sidebarWidth }}
          clickTrackButton={clickTrackButton}
        />
      </div>
      <div className={styles.rtLayoutMain}>
        <div className={styles.rtLayoutTimeline} ref={timeline} onScroll={isSticky ? handleScrollX : noop}>
          <Timeline
            now={now}
            time={time}
            timebar={timebar}
            tracks={tracks}
            sticky={{
              isSticky,
              setHeaderHeight: setHeaderHeight,
              viewportWidth: timelineViewportWidth,
              handleHeaderScrollY: handleHeaderScrollY,
              headerHeight,
              scrollLeft,
            }}
            clickElement={clickElement}
          />
        </div>
      </div>
    </div>
  )
}

export default Layout
