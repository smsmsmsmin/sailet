import React from "react";
import { Route, Switch } from "react-router";
import {Root, Place, Print} from "../pages";

const App = () => {
  return (
    <Switch>
        <Route exact path="/" component={Root} />
        <Route exact path="/place/:id" component={Place} />
        <Route exact path="/print/:id" component={Print} />
    </Switch>
  );
};

export default App;
