import React from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'
import styles from './index.less'

const Row = ({ time, cells, style }) => (
  <div className={styles.rtTimebarRow} style={style}>
    {cells.map(cell => (
      <Cell key={cell.id} time={time} {...cell} />
    ))}
  </div>
)

Row.propTypes = {
  time: PropTypes.shape({}).isRequired,
  cells: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  style: PropTypes.shape({}),
}

export default Row
