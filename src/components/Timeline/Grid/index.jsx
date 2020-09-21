import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'

const Grid = ({ time, grid }) => (
  <div className={styles.rtGrid}>
    {grid.map(({ id, start, end }) => (
      <div key={id} className={styles.rtGridCell} style={time.toStyleLeftAndWidth(start, end)} />
    ))}
  </div>
)

Grid.propTypes = {
  time: PropTypes.shape({
    toStyleLeftAndWidth: PropTypes.func,
  }).isRequired,
  grid: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
}

export default Grid
