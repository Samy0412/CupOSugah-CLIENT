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
  const { state, user, setUser, setReceiver, setEvent, setAlert} = useApplicationData();
  const [categories, setCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchCategoriesAndSubscriptions = async () => {
    const data = await axios.get("/categories");
    setCategories(data.data);
    const mata = await axios.get("/subscriptions");
    setSubscriptions(mata.data);
  };

  //retreives all of the categories and subscriptions
  useEffect(() => {
    fetchCategoriesAndSubscriptions();

  }, []);

  //That is going to be our main app, once we log in or sign in
  const Website = () => (
    <div>
      <Nav user={user} logout={setUser} />
      <Switch>
        <Route path="/home" exact>
          <Home
            user={user}
            receiver={state.receiver}
            receiverData={setReceiver}
            eventSelected={state.event}
            setEvent={setEvent}
          ></Home>
        </Route>
        <Route path="/events" exact>
          <Events
            user={user}
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
            user={user}
            receiver={state.receiver}
            receiverData={setReceiver}
            subscriptions={subscriptions}
            categories={categories}
          ></Services>
        </Route>
        <Route path="/alerts" exact>
          <Alerts
            user={user}
            receiver={state.receiver}
            receiverData={setReceiver}
            subscriptions={subscriptions}
            categories={categories}
            setAlert={setAlert}
          ></Alerts>
        </Route>
        <Route path="/map" exact>
          <MapPage
            user={user}
            receiver={state.receiver}
            receiverData={setReceiver}
            eventSelected={state.event}
            alertSelected={state.alert}
            setEvent={setEvent}
          ></MapPage>
        </Route>
        <Route path="/messages" exact>
          <Messages user={user} receiver={state.receiver} ></Messages>
        </Route>
        <Route path="/account" exact>
          <Account
            updateSubscriptions={fetchCategoriesAndSubscriptions}
            subscriptions={subscriptions}
            categories={categories}
            user={user}
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
            user={user}
            register={setUser}
          ></SelectNeighbourhood>
        </Route>
        <Route path="/createNeighbourhood" exact>
          <CreateNeighbourhood
            user={user}
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
