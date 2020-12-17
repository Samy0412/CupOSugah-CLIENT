import React, { useState, useEffect } from 'react'
import axios from "axios";

// @material-ui/core components

import { Grid } from "@material-ui/core";
import { Form, Button } from "react-bootstrap";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

//Our own style sheet
import "../../styles.scss";

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 3,
    width: 15,
    height: 15,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  },
  checkedIcon: {
    backgroundColor: "#f3c677",
    '&:before': {
      display: 'block',
      width: 15,
      height: 15,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
   
  },
});



function Notifications(props) {

  const classes = useStyles();

  const [checked, setChecked] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
    20: false,
    21: false,
  });

  const filterCategories = (filter) => {
    const filtered = props.categories.filter(
      (category) => category.category_type === filter
    );
    return filtered;
  };


  const sortSubscriptions = function (subscriptions) {
    let createSubs = [];
    for (const entry in subscriptions) {
      if (subscriptions[entry] === true) {
        createSubs.push(entry);
      }
    }
    return createSubs;
  };

  const updateSubscriptionPreferences = async function (subscriptionData) {
    const newSubscriptions = subscriptionData.subscriptions;
    const generateAxiosCalls = function () {
      return Promise.all(
        newSubscriptions.map((categoryId) => {
          return axios.post("/subscriptions", {
            user_id: subscriptionData.user_id,
            category_id: categoryId,
          });
        })
      );
    };
    // SET TIMEOUT MIGHT FIX?! LIKE TWILIO!?
    await axios
      .post("/subscriptions/delete", { user_id: subscriptionData.user_id })
      .then(generateAxiosCalls())
      .then(
        setTimeout(() => props.updateSubscriptions()),
        2000
      )
      .then(props.handleClose())
      .catch((err) => console.error("query error", err.stack));
    // .then(axios.post("/users/notifcation-settings", { alert_types: subscriptionData.alert_types, user_id: subscriptionData.user_id }))
    // .then((response) => {
    //   console.log("REPOND", response)
    // })
    // CAUSING PROXY ERRORS which either results in multiple subscriptions for the current user disappearing, or just ID 1 (Emergencies) being unsubscribed-from.
    // RETURNING REDIRECT BELOW MAKES THIS WORK AS INTENDED, AT THE COST OF CAUSING A RERENDER.
    // return (
    //   <Redirect to="/account" />
    // )
  };


  const populateChecked = function () {
    const buttonsToCheck = props.subscriptions
      .filter((sub) => sub.user_id === props.user.id)
      .map((sub) => sub.category_id);
    const generateCheckedState = function () {
      const obj = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
        21: false,
      };
      for (const sub of buttonsToCheck) {
        obj[sub] = true;
      }
      return obj;
    };
    setChecked(generateCheckedState());
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    updateSubscriptionPreferences({
      // alert_types: state.selectedAlert_Type,
      subscriptions: sortSubscriptions(checked),
      user_id: props.user.id,
    });
  };


  const handleClick = (e) => {
    const boxName = e.target.name;
    setChecked({
      ...checked,
      [boxName]: !checked[boxName],
    });
  };

  useEffect(() => {
    populateChecked();
  }, [props.subscriptions]);

  return (
  <div id="account-subscriptions-subscriptions">
    {/* <Grid container spacing={3}> */}
      <Form
        id="account-subscriptions-form"
        onSubmit={onSubmitHandler}
      >
        <Grid item xs={12}>
          <div className="post-event-header">
            <h2 id="transition-modal-title">
              SMS Notifications
            </h2>
            <Button
              onClick={props.handleClose}
              variant="none"
              type="button"
              id="close-button"
            >
              <img src="./images/delete.svg" alt="cancel"></img>
            </Button>
          </div>
            </Grid>
          <p id="account-SMS-note">
            <small>
              <i>
                To receive subscription-notifications, please
                ensure that your account is registered with a
                SMS-enabled phone number.
              </i>
            </small>
          </p>
          
        <Grid item xs={12}>
          <h5 className="account-subscriptions-category">
            Alerts
          </h5>
          <div className="account-map-wrapper">
            {filterCategories("Alerts").map((category) => (
              <FormControlLabel
              control={<Checkbox
                id={category.id} 
                key={category.id} 
                name={category.id} 
                checked={checked[category.id]} 
                onChange={handleClick}
                checkedIcon= {<span className={clsx(classes.icon, classes.checkedIcon)} />}
                icon={<span className={classes.icon} />}
                inputProps={{ 'aria-label': 'decorative checkbox' }}
                {...props}  
                className={classes.root}
                disableRipple
                color="default"
              />}            
              label={category.name}
              className="checkbox"
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={12}>
          <h5 className="account-subscriptions-category">
            Events
          </h5>
          <div className="account-map-wrapper">
            {filterCategories("Events").map((category) => (
             <FormControlLabel
             control={<Checkbox
               id={category.id} 
               key={category.id} 
               name={category.id} 
               checked={checked[category.id]} 
               onChange={handleClick}
               checkedIcon= {<span className={clsx(classes.icon, classes.checkedIcon)} />}
               icon={<span className={classes.icon} />}
               inputProps={{ 'aria-label': 'decorative checkbox' }}
               {...props}  
               className={classes.root}
               disableRipple
               color="default"
             />}            
             label={category.name}
             className="checkbox"
             />
            ))}
          </div>
        </Grid>
        <Grid item xs={12}>
          <h5 className="account-subscriptions-category">
            Services
          </h5>
          <div className="account-map-wrapper">
            {filterCategories("Services").map((category) => (
              <FormControlLabel
              control={<Checkbox
                id={category.id} 
                key={category.id} 
                name={category.id} 
                checked={checked[category.id]} 
                onChange={handleClick}
                checkedIcon= {<span className={clsx(classes.icon, classes.checkedIcon)} />}
                icon={<span className={classes.icon} />}
                inputProps={{ 'aria-label': 'decorative checkbox' }}
                {...props}  
                className={classes.root}
                disableRipple
                color="default"
              />}            
              label={category.name}
              className="checkbox"
              />
            ))}
          </div>
        </Grid>
        <div id="account-subscriptions-buttons">
          <Button
            variant="warning"
            type="submit"
            className="service-alert-button post"
          >
            <div className="save">
              <i class="fa fa-save fa-2x"></i>
              <div>SAVE</div>
            </div>
          </Button>
        </div>
      </Form>
  </div>
 );
}

export default Notifications
