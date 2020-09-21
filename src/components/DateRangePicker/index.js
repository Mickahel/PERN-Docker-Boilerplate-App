import React, { useState } from "react";
import "./style.scss";
import moment from 'moment'
import { convertDDMMYYYYInMMDDYYYY } from 'auxiliaries/DateAuxiliaries'
import { DatePicker } from "@material-ui/pickers";
import TextField from '@material-ui/core/TextField';
import { Trans } from 'react-i18next'
import PropTypes from 'prop-types'
import { DateRangePicker as DRP, DateRange, DateRangeDelimiter } from "@material-ui/pickers";
import classnames from 'classnames'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';

function DateRangePicker(props) {

  const { dateFrom, dateTo, textFieldLabel, submitFunction } = props
  const [selectedDates, handleDatesChange] = useState([
    dateFrom,
    dateTo
  ]);
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <div className="dateRangePicker" >

      <div className={classnames(window.md.match('apple') && "appleTextFieldWrapper")} >

        <DRP
          //startText="Check-in"
          value={selectedDates}
          disableFuture
          onOpen={()=>{setShowCalendar((true))}}
          onClose={()=>{setShowCalendar((false))}}
          onChange={date => {
          }}
          onAccept={(date) => {
            handleDatesChange(date)
            submitFunction(moment(date[0]).format("x"), moment(date[1]).format("x"))
          }}
          renderInput={(startProps, endProps) => {
           return (

            
            <TextField
              {...startProps}
              helperText=""

              label={(moment.locale() == "it") ? startProps.helperText.replace("dd", "gg").replace("yyyy", "aaaa") : startProps.helperText}
              inputProps={
                {
                  ...startProps.inputProps,
                  readOnly: true,
                  value: `${moment(startProps.inputProps.value, (moment.locale() == "it") ? "DD/MM/YYYY": "MM/DD/YYYY").format('Do MMMM YYYY')} - ${moment(endProps.inputProps.value,(moment.locale() == "it") ? "DD/MM/YYYY": "MM/DD/YYYY").format('Do MMMM YYYY')}`
                }
              }
              size="small"
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment disablePointerEvents position="end">
                        {showCalendar ? <ArrowDropUpOutlinedIcon color="primary" /> : <ArrowDropDownOutlinedIcon color="primary" />}
                </InputAdornment>

            }}
            />

          )}}
        />
      </div>
    </div>
  );
}

DateRangePicker.propTypes = {

  textFieldLabel: PropTypes.string,
  submitFunction: PropTypes.func,

}

DateRangePicker.defaultProps = {
  dateFrom: false,
  dateTo: false,
  textFieldLabel: false,
  submitFunction: true,

}
export default DateRangePicker;
