import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Home from './form/desktop1'
import Login from './form/desktop2'
import Config from './form/desktop3'

const PrivateRoutes = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render = {props => (
    (localStorage.getItem('access_token')) ?
      <Component {...props} />
      :
      <Redirect to="/login"/>
    )}
   />
)

const Routes = () => (
  <Router>
    <Suspense fallback={<CircularProgress/>}>
      <Switch>
        <PrivateRoutes exact path="/" component={ Home }/>
        <Route path="/login" component={ Login }/>
        <PrivateRoutes path="/config" component={  Config }/>
      </Switch>
    </Suspense>
  </Router>

)

export default Routes