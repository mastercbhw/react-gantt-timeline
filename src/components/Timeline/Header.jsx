import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Timebar from './Timebar'
import { useUpdateEffect, usePrevious } from '@umijs/hooks'
import cls from 'classnames'
import styles from './index.less'

const noop = () => { }


function Header(props) {
  const {
    time,
    onMove,
    onEnter,
    onLeave,
    width,
    timebar: rows,
    sticky = {},
    sticky: { isSticky, headerHeight, viewportWidth, scrollLeft } = {},
  } = props

  const scrollRef = useRef()
  const timebarRef = useRef()

  useEffect(() => {
    if (sticky) {
      sticky.setHeaderHeight(timebarRef.current.offsetHeight)
      const { scrollLeft, isSticky } = sticky
      if (isSticky) {
        scrollRef.current.scrollLeft = scrollLeft
      }
    }
  }, [])

  useUpdateEffect(() => {
    if (sticky) {
      if (scrollLeft !== sticky.scrollLeft || isSticky !== sticky.isSticky) {
        scrollRef.current.scrollLeft = sticky.scrollLeft
      }
    }
  }, [sticky])


  const handleScroll = () => {
    sticky.handleHeaderScrollY(scrollRef.current.scrollLeft)
  }


  return (
    <div
      style={isSticky ? { paddingTop: headerHeight } : {}}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className={cls(styles.rtTimelineHeader, { [styles.rtIsSticky]: isSticky })}
        style={isSticky ? { width: viewportWidth, height: headerHeight } : {}}
      >
        <div className={styles.rtTimelineHeaderScroll} ref={scrollRef} onScroll={isSticky ? handleScroll : noop}>
          <div ref={timebarRef} style={isSticky ? { width } : {}}>
            <Timebar time={time} rows={rows} />
          </div>
        </div>
      </div>
    </div>)
}


Header.propTypes = {
  time: PropTypes.shape({}).isRequired,
  timebar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
  onMove: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  sticky: PropTypes.shape({
    isSticky: PropTypes.bool.isRequired,
    setHeaderHeight: PropTypes.func.isRequired,
    viewportWidth: PropTypes.number.isRequired,
    handleHeaderScrollY: PropTypes.func.isRequired,
    scrollLeft: PropTypes.number.isRequired,
  }),
}


export default Header
