import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'


function CustomScrollbar(props) {

  let styleHorizontal = {}

  let styleVertical = {}

  let renderTrackHorizontal = ({ style, ...props }) => <div {...props} style={{ ...style }} />
  let renderThumbHorizontal = ({ style, ...props }) => <div {...props} style={{ ...style, ...styleHorizontal }} />
  if (!props.horizontal) {
    styleHorizontal.display = 'none'
    renderTrackHorizontal = props => <div {...props} style={{ display: "none" }} />
    renderThumbHorizontal = props => <div {...props} style={{ display: "none" }} />
  }

  //let renderTrackVertical = ({ style, ...props }) =><div {...props}  style={{ ...style }}/>
  // let renderThumbVertical = ({ style, ...props }) =><div {...props} style={{ ...style, ...styleVertical }}/>
  if (!props.vertical) {
    styleVertical.display = 'none'
    renderTrackHorizontal = props => <div {...props} style={{ display: "none" }} />
    renderThumbHorizontal = props => <div {...props} style={{ display: "none" }} />
  }

  let newProps = { ...props }
  delete newProps.horizontal
  delete newProps.vertical

  return (<Scrollbars
    universal={props.universal}
    autoHide={props.autoHide}
    hideTracksWhenNotNeeded={props.hideTracksWhenNotNeeded}
    autoHeight={props.autoHeight}
    autoHeightMin={'100%'}
    className={classnames("scrollbar max-h-full", props.className)}
    renderTrackHorizontal={renderTrackHorizontal}
    renderThumbHorizontal={renderThumbHorizontal}
    {...newProps}>
      {props.children}
    </Scrollbars>)
}

CustomScrollbar.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  hideTracksWhenNotNeeded: PropTypes.bool,
  autoHeight: PropTypes.bool,
  autoHide: PropTypes.bool,
  universal: PropTypes.bool,
}

CustomScrollbar.defaultProps = {
  universal: true,
  horizontal: true,
  vertical: true,
  hideTracksWhenNotNeeded: true,
  autoHeight: true,
  autoHide: true,
}

export default CustomScrollbar
