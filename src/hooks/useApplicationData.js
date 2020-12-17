import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {


  //Gets the information from localstorage each time there is a refresh and set the state at first load
  function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  }
 
  //Hook to store the state and update it
  const [state, setState] = useState({
    receiver: {},
    event: {},
    alert:{},
  });
  const [user,setUser]= useStickyState({}, "userObj");
  const [resetDatabase, setResetDatabase]=useStickyState(false, "resetDatabase");

  //Function to update the state of the user
  const setReceiver = (receiver) => setState({ ...state, receiver });
  const setEvent = (event) => setState({ ...state, event });
  const setAlert = (alert)=> setState ({...state, alert});

  //Reset the database once only
  useEffect(() => {
    if(!resetDatabase){
    axios.get(`${process.env.REACT_APP_API_BASE_URL}api/debug/reset`).then(()=> {
      setResetDatabase(true);
      console.log("database reset!")
    })
  }
  }, []);


  return {
    state,
    user,
    setUser,
    setReceiver,
    setEvent,
    setAlert,
  };
}
