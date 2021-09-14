import React from "react";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
// pages
import Login from "./Login";
import Contacts from "./Contacts";
import Contact from "./Contact";
import Signup from "./Signup";

const ReactRouterSetup = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
        <Route path="/contacts/:id" children={<Contact />}></Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
