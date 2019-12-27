import React from "react";
import { Route, Switch } from "react-router";
import { ForPlace, ForPlaceDistance, Root } from "../Pages";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Root} />
      <Route path="/place/:status/:lat/:lng" component={ForPlace} />
      <Route
        path="/distance/:mylat/:mylng/:lat/:lng"
        component={ForPlaceDistance}
      />
    </Switch>
  );
};

export default App;
