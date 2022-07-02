import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function DatePicker(props) {
  const { label, value, onChange, placeholder, blockDates, customClassName, noPadding, input } = props;

  let inputProps = {
    placeholder: placeholder,
    className: "date-picker w-full",
  };

  const prevDay = moment(blockDates).subtract(1, "day");

  const valid = function (current) {
    return current.isAfter(prevDay);
  };

  let className = classNames("block", customClassName, { "py-2": !noPadding });

  return (
    <div className="block">
      <label className="block my-2">{label}</label>

      <Datetime
        isValidDate={blockDates && valid}
        dateFormat="DD/MM/YYYY"
        inputProps={inputProps}
        locale="tr-TR"
        closeOnSelect
        value={value}
        input={true}
        onChange={onChange}
      />
    </div>
  );
}

DatePicker.defaulProps = {
  input: true,
};

DatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  blockDates: PropTypes.any,
  customClassName: PropTypes.string,
  noPadding: PropTypes.bool,
  input: PropTypes.bool,
};
