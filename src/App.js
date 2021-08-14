import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import ipConfig from "./ipConfig.json";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/v1`
}
export default function App(props){
  return (
    <div className="App">
      <Switch>
        <Route path="/calendar">
          <Home/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/">
          <Register/>
        </Route>
      </Switch>
    </div>
  )
}