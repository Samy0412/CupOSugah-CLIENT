import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";
import { green } from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import "../../styles.scss";

const YellowSwitch = withStyles({
  switchBase: {
    color: yellow["A700"],
    "&$checked": {
      color: yellow["A700"],
    },
    "&$checked + $track": {
      backgroundColor: yellow[600],
    },
  },
  checked: {},
  track: {},
})(Switch);

const GreenSwitch = withStyles({
  switchBase: {
    color: green["A700"],
    "&$checked": {
      color: green["A700"],
    },
    "&$checked + $track": {
      backgroundColor: green[300],
    },
  },
  checked: {},
  track: {},
})(Switch);

const BlueSwitch = withStyles({
  switchBase: {
    color: blue[600],
    "&$checked": {
      color: blue[600],
    },
    "&$checked + $track": {
      backgroundColor: blue[300],
    },
  },
  checked: {},
  track: {},
})(Switch);

const RedSwitch = withStyles({
  switchBase: {
    color: red[600],
    "&$checked": {
      color: red[600],
    },
    "&$checked + $track": {
      backgroundColor: red[300],
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function SwitchLabels(props) {
  return (
    <div className="switches-box">
      <FormGroup row>
        <FormControlLabel
          control={
            <YellowSwitch
              checked={props.Neighbours}
              onChange={props.handleChange}
              name="Neighbours"
            />
          }
          label="Neighbours"
        />
        <FormControlLabel
          control={
            <GreenSwitch
              checked={props.Events}
              onChange={props.handleChange}
              name="Events"
            />
          }
          label="Events"
        />
        <FormControlLabel
          control={
            <BlueSwitch
              checked={props.Services}
              onChange={props.handleChange}
              name="Services"
            />
          }
          label="Services"
        />
        <FormControlLabel
          control={
            <RedSwitch
              checked={props.Alerts}
              onChange={props.handleChange}
              name="Alerts"
              color="secondary"
            />
          }
          label="Alerts"
        />
      </FormGroup>
    </div>
  );
}
