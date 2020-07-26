import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function RoundLoader(props){

    const { size, className } = props
    return (
      <div className={classnames(className, "roundLoader flex flex-1 items-center justify-center w-full h-full generic-circular-progress")}>
        <CircularProgress size={size} className='circularProgressLoader' />
      </div>
    )
}

RoundLoader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
}

RoundLoader.defaultProps = {
  className: "",

}

export default RoundLoader
