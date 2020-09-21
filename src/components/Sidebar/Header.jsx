import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'
import cls from 'classnames'

const Header = ({ timebar, sticky: { isSticky, sidebarWidth, headerHeight } = {} }) => (
  <div style={isSticky ? { paddingTop: headerHeight } : {}}>
    <div
      className={cls(styles.rtSidebarHeader, { [styles.rtIsSticky]: isSticky })}
      style={isSticky ? { width: sidebarWidth } : {}}
    >
      {timebar.map(({ id, title }) => (
        <div key={id} className={styles.rtTimebarKey}>
          {title}
        </div>
      ))}
    </div>
  </div>
)

Header.propTypes = {
  sticky: PropTypes.shape({
    isSticky: PropTypes.bool.isRequired,
    headerHeight: PropTypes.number.isRequired,
    sidebarWidth: PropTypes.number.isRequired,
  }),
  timebar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
}

export default Header
