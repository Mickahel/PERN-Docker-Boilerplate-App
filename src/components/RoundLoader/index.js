import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'
import { makeStyles } from '@material-ui/core/styles';
import config from 'configuration/config'


const useStyles = makeStyles((theme) => ({
  root:{
    color: config.theme.roundLoader.color || config.palette.primaryColor
  }
}))

function RoundLoader(props){

    const { size, className } = props
    const classes = useStyles();
    return (
      <div className={classnames(className, "flex flex-1 items-center justify-center w-full h-full")}>
        <CircularProgress size={size} className={classnames(classes.root, 'circularProgressLoader')} />
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
