import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withModules } from './context';
import SpecialNavContainer from './layout/special-nav-container';

const App = ({ modules }) => (
  <Router>
    <>
      <CssBaseline />
      <SpecialNavContainer modules={modules} />
    </>
  </Router>
);

export default withModules(App);
