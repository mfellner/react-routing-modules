import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import groupBy from '../utils/group-by';
import filter from '../utils/filter';
import { navNameForPath } from '../nav-names';

const styles = theme => ({
  main: {
    padding: theme.spacing.unit * 2,
    marginTop: 64,
  },
  link: {
    textDecoration: 'none',
  },
});

const Nav = withStyles(styles)(({ classes, modules }) => {
  const modulesByPath = groupBy(modules, 'path');
  return (
    <AppBar component="nav" color="default">
      <Toolbar>
        {Object.entries(modulesByPath).map(([path, modulesAtPath]) => (
          <Link key={path} to={path} className={classes.link}>
            <Button size="small">{navNameForPath(modules, path)}</Button>
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  );
});

const Routes = ({ modules, children }) => {
  const modulesByPath = groupBy(modules, 'path');
  return (
    <Grid container spacing={8}>
      {Object.entries(modulesByPath).map(([path, modulesAtPath]) => (
        <Route
          exact
          path={path}
          key={path}
          render={() =>
            modulesAtPath.map(m => (
              <Grid item key={m.name} xs={12}>
                <m.component />
              </Grid>
            ))
          }
        />
      ))}
      <Route
        render={() => (
          <Grid item xs={12}>
            {children}
          </Grid>
        )}
      />
    </Grid>
  );
};

const PrimaryNavContainer = ({ classes, modules, children }) => (
  <main className={classes.main}>
    <Nav modules={filter(modules, { showInNavigation: true })} />
    <Routes modules={modules}>{children}</Routes>
  </main>
);

export default withStyles(styles)(PrimaryNavContainer);
