import { useState, useEffect } from "react";
import axios from "axios";

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
    if(!state.databaseReset){
      axios.get("https://cuposugah.herokuapp.com/api/debug/reset")
      .then(()=> {
        setDatabaseReset(true)})
      .then(()=> {
        localStorage.setItem("databaseReset", JSON.stringify(state.databaseReset));
        console.log("database reset");
      })  
      .then(()=>{
        const data = localStorage.getItem("userObj");
        const data2 = localStorage.getItem("databaseReset");
        console.log(data2);
        if (data && data2) {
          const user = JSON.parse(data);
          const databaseReset = JSON.parse(data2);
          setState({ ...state, user,databaseReset});
      }
      })
    }else{
      const data = localStorage.getItem("userObj");
      const data2 = localStorage.getItem("databaseReset");
      console.log(data2);
      if (data && data2) {
        const user = JSON.parse(data);
        const databaseReset = JSON.parse(data2);
        setState({ ...state, user,databaseReset});
    }
    }
  }, []);

  //Stores the user information in localStorage so that we can use it to set the state again if a refresh happens
  useEffect(() => {
    localStorage.setItem("userObj", JSON.stringify(state.user));
  }, [state.user]);


  


  

  return {
    state,
    setUser,
    setReceiver,
    setEvent,
    setAlert,
    setDatabaseReset,
  };
}
