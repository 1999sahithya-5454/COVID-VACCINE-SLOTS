import { useEffect, useState } from "react";
import "./App.css";
import Appbar from "./Appbar";
import Button from "@material-ui/core/Button";
import Card from "./Card";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField"
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const date = "05/01/2022";
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});
function App() {
  const classes = useStyles();
  const [arr, setArr] = useState([]);
  const [pin, setPin] = useState(560000);

  const [value, setValue] = useState(true);
  const [selectedDate, setSelectedDate] = useState(date);
  const handleDateChange = (date) => {
    console.log(date);
    const dateObj = date;
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    const output = day + "/" + month + "/" + year;
    setSelectedDate(output);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(!value);
  };
  useEffect(() => {
    const fetchMoviesBadStatus = async () => {
      const response = await fetch(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${pin}&date=${selectedDate}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);
      const a = data.centers;

      setArr(a);
    };
    fetchMoviesBadStatus();
  }, [value]);
  
  return (
    <div>
      <Appbar />
      <div className="sahithya">
        <div>
          <div className="formdata">
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                onChange={(e) => {
                  setPin(e.target.value);
                }}
                className={classes.field}
                label="Enter the District id"
                variant="outlined"
                fullWidth
                required
                type="number"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date of Appointment"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                  "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="cardcl">
        {arr.map((item) => {
          return <Card key={item.center_id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default App;
