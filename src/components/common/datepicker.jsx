import "date-fns";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

const Datepicker = ({ date, handleChange, label, required }) => {
  const [selectedDate, setSelectedDate] = useState(date);

  const handleDateChange = date => {
    setSelectedDate(date);
    handleChange("birthDate", date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label={label}
        format="MM/dd/yyyy"
        style={{ width: 400 }}
        variant="inline"
        inputVariant="outlined"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
        required={required}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Datepicker;
