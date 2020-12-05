import React, { useEffect, useState } from "react";
import "../styles.scss";
import axios from "axios";
import Nav from "./Nav/Nav";
import Events from "./Events/Events";
import Services from "./Services/Services";
import Alerts from "./Alerts/Alerts";
import MapPage from "./Map/MapPage";
import Messages from "./Messages/Messages";
import Account from "./Account/Account";
import Home from "./Home/Home";
import Landing from "./Landing/Landing";

import Register from "./Landing/Register";
import SelectNeighbourhood from "./Landing/SelectNeighbourhood";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Imports custom hook that manages the state
import useApplicationData from "../hooks/useApplicationData";
import Header from "./Landing/Header";
import Address from "./Landing/Address";
import CreateNeighbourhood from "./Landing/CreateNeighbourhood";
import About from "./Landing/About";
import Team from "./Landing/Team";

function App() {
  //Gets the state from useApplicationData.js
  const { state, setUser, setReceiver, setEvent, setAlert, setDatabaseReset } = useApplicationData();
  const [categories, setCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchCategoriesAndSubscriptions = async () => {
    const data = await axios.get("/categories");
    setCategories(data.data);
    const mata = await axios.get("/subscriptions");
    setSubscriptions(mata.data);
  };


  useEffect(() => {
    fetchCategoriesAndSubscriptions();
    if(!state.databaseReset){
      axios.get("https://cuposugah.herokuapp.com/api/debug/reset")
      .then(()=> {
        setDatabaseReset(true)
        localStorage.setItem("databaseReset", JSON.stringify(true));
        console.log("database reset");
      })
    }else {
      const data = localStorage.getItem("userObj");
      const data2 = localStorage.getItem("databaseReset");
      if (data) {
        const user = JSON.parse(data);
        const databaseReset = JSON.parse(data2);
        setUser(user)
        setDatabaseReset(databaseReset)
    }}
  }, []);



  //That is going to be our main app, once we log in or sign in
  const Website = () => (
    <div>
      <Nav user={state.user} logout={setUser} />
      <Switch>
        <Route path="/home" exact>
          <Home
            user={state.user}
            receiver={state.receiver}
            receiverData={setReceiver}
            eventSelected={state.event}
            setEvent={setEvent}
          ></Home>
        </Route>
        <Route path="/events" exact>
          <Events
            user={state.user}
            receiver={state.receiver}
            receiverData={setReceiver}
            subscriptions={subscriptions}
            categories={categories}
            eventSelected={state.event}
            setEvent={setEvent}
          ></Events>
        </Route>
        <Route path="/services" exact>
          <Services
            user={state.user}
            receiver={state.receiver}
            receiverData={setReceiver}
            subscriptions={subscriptions}
            categories={categories}
          ></Services>
        </Route>
        <Route path="/alerts" exact>
          <Alerts
            user={state.user}
            receiver={state.receiver}
            receiverData={setReceiver}
            subscriptions={subscriptions}
            categories={categories}
            setAlert={setAlert}
          ></Alerts>
        </Route>
        <Route path="/map" exact>
          <MapPage
            user={state.user}
            receiver={state.receiver}
            receiverData={setReceiver}
            eventSelected={state.event}
            alertSelected={state.alert}
            setEvent={setEvent}
          ></MapPage>
        </Route>
        <Route path="/messages" exact>
          <Messages user={state.user} receiver={state.receiver} ></Messages>
        </Route>
        <Route path="/account" exact>
          <Account
            updateSubscriptions={fetchCategoriesAndSubscriptions}
            subscriptions={subscriptions}
            categories={categories}
            user={state.user}
            editUser={setUser}
          ></Account>
        </Route>
      </Switch>
    </div>
  );
  return (
    <div>
    <Router>
      <Switch>
        {/* These are the path were we don't want to see the navbar */}
        <Route path="/" exact>
          <Header login={setUser}/>
          <Landing/>
        </Route>
        <Route path="/about" exact>
          <Header login={setUser}/>
          <About/>
        </Route>
        <Route path="/team" exact>
          <Header login={setUser}/>
          <Team/>
        </Route>
        <Route path="/register" exact>
          <Register register={setUser}></Register>
        </Route>
        <Route path="/address" exact>
          <Address register={setUser} user={state.user}></Address>
        </Route>
        <Route path="/selectNeighbourhood" exact>
          <SelectNeighbourhood
            user={state.user}
            register={setUser}
          ></SelectNeighbourhood>
        </Route>
        <Route path="/createNeighbourhood" exact>
          <CreateNeighbourhood
            user={state.user}
            register={setUser}
          ></CreateNeighbourhood>
        </Route>
        {/* These are the paths were we will see the navbar */}
        <Route component={Website} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
