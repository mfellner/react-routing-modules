import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import urljoin from 'url-join';
import groupBy from '../utils/group-by';
import resolveParameterizedPath from '../utils/resolve-parameterized-path';
import { navNameForPath } from '../nav-names';
import { RelativeLinkProvider } from '../routing';

const styles = {
  link: {
    textDecoration: 'none',
  },
};

const Nav = withStyles(styles)(({ classes, modules, match }) => {
  const filteredModules = modules.filter(m => !!m.showInNavigation);
  const modulesByPath = groupBy(filteredModules, 'path');
  return (
    <Toolbar disableGutters component="nav">
      {Object.entries(modulesByPath).map(([path, modulesAtPath]) => (
        <Link
          key={path}
          to={resolveParameterizedPath(path, match.params)}
          className={classes.link}
        >
          <Button size="small">{navNameForPath(modules, path)}</Button>
        </Link>
      ))}
    </Toolbar>
  );
});

const Routes = ({ modules }) => {
  const modulesByPath = groupBy(modules, 'path');
  return (
    <Grid container spacing={8}>
      {Object.entries(modulesByPath).map(([path, modulesAtPath]) => {
        // See https://github.com/ReactTraining/react-router/pull/5889
        const pathsToMatch = modulesAtPath.flatMap(({ path, routes = [] }) => [
          path,
          ...routes.map(route => urljoin(path, route)),
        ]);
        return (
          <Route
            exact
            path={pathsToMatch}
            key={path}
            render={({ match, history }) =>
              modulesAtPath.map(m => (
                <Grid item key={m.name} xs={12}>
                  <RelativeLinkProvider value={{ path, match, history }}>
                    <m.component />
                  </RelativeLinkProvider>
                </Grid>
              ))
            }
          />
        );
      })}
    </Grid>
  );
};

const NotFound = () => (
  <Grid item xs={12}>
    <Typography variant="h6">Not found.</Typography>
  </Grid>
);

const SecondaryNavContainer = ({ modules }) => {
  // See https://github.com/ReactTraining/react-router/pull/5889
  const pathsToMatch = modules.flatMap(({ path, routes = [] }) => [
    path,
    ...routes.map(route => urljoin(path, route)),
  ]);
  return (
    <Switch>
      <Route
        exact
        path={pathsToMatch}
        render={({ match }) => (
          <>
            <Nav modules={modules} match={match} />
            <Routes modules={modules} />
          </>
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default SecondaryNavContainer;
