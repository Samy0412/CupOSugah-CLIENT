import { useState, useEffect } from "react";

export default function useApplicationData() {
  //Hook to store the state and update it
  const [state, setState] = useState({
    user: {},
    receiver: {},
    event: {},
    alert:{},
    databaseReset:false,
  });
  //Function to update the state of the user
  const setUser = (user) => setState({ ...state, user });
  const setReceiver = (receiver) => setState({ ...state, receiver });
  const setEvent = (event) => setState({ ...state, event });
  const setAlert = (alert)=> setState ({...state, alert});
  const setDatabaseReset = (databaseReset)=>setState({...state, databaseReset});

  //Gets the information from localstorage each time there is a refresh and set the state at first load)
  useEffect(() => {
    const data = localStorage.getItem("userObj");
    const data2 = localstorage.getItem("databaseReset");
    if (data) {
      const user = JSON.parse(data);
      const databaseReset = JSON.parse(data2);
      setState({ ...state, user,databaseReset});
    }
  }, []);

  //Stores the user information in localStorage so that we can use it to set the state again if a refresh happens
  useEffect(() => {
    localStorage.setItem("userObj", JSON.stringify(state.user));
  }, [state.user]);

  useEffect(()=> {
    localStorage.setItem("databaseReset",JSON.stringify(state.databaseReset));
  },[state.databaseReset])

  return {
    state,
    setUser,
    setReceiver,
    setEvent,
    setAlert,
    setDatabaseReset,
  };
}
