import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import urljoin from 'url-join';
import groupBy from '../utils/group-by';
import filter from '../utils/filter';
import resolveParameterizedPath from '../utils/resolve-parameterized-path';
import { navNameForPath } from '../nav-names';
import { RelativeLinkProvider } from '../routing';

const styles = theme => ({
  main: {
    padding: theme.spacing.unit * 2,
    marginTop: 64,
  },
  link: {
    textDecoration: 'none',
  },
});

const PrimaryNav = withStyles(styles)(({ classes, modules }) => {
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

const SecondaryNav = withStyles(styles)(({ classes, modules, match }) => {
  const modulesByPath = groupBy(modules, 'path');
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

const ModulesAtPath = ({ modules, path, match, history }) => (
  <>
    {modules.map(m => (
      <Grid item key={m.name} xs={12}>
        <RelativeLinkProvider value={{ path, match, history }}>
          <m.component />
        </RelativeLinkProvider>
      </Grid>
    ))}
  </>
);

function getModulePathsToMatch(modules) {
  return modules.flatMap(({ path, routes = [] }) => [
    path,
    ...routes.map(route => urljoin(path, route)),
  ]);
}

function getModuleRoutes(modules) {
  return modules.flatMap(({ path, routes = [] }) =>
    routes.map(route => urljoin(path, route)),
  );
}

const PrimaryNavContainer = ({ classes, modules }) => {
  const primaryModules = filter(modules, { position: 0 });
  const primaryNavModules = filter(primaryModules, { showInNavigation: true });
  const primaryModulesByPath = groupBy(primaryModules, 'path');

  return (
    <main className={classes.main}>
      <PrimaryNav modules={primaryNavModules} />
      <Grid container spacing={8}>
        <Switch>
          {Object.entries(primaryModulesByPath).map(
            ([primaryPath, primaryModulesAtPath]) => {
              const secondaryModules = filter(modules, {
                position: 1,
                path: p => p.startsWith(primaryPath),
              });
              const secondaryNavModules = filter(secondaryModules, {
                showInNavigation: true,
              });
              const secondaryModulesByPath = groupBy(secondaryModules, 'path');
              const primaryPathsToMatch = Array.from(
                new Set([
                  ...getModulePathsToMatch(primaryModulesAtPath),
                  ...getModulePathsToMatch(secondaryModules),
                ]),
              );
              return (
                <Route
                  exact
                  path={primaryPathsToMatch}
                  key={primaryPath}
                  render={({ match, history }) => (
                    <>
                      <ModulesAtPath
                        modules={primaryModulesAtPath}
                        path={primaryPath}
                        match={match}
                        history={history}
                      />
                      <Grid item xs={12}>
                        <SecondaryNav
                          match={match}
                          modules={secondaryNavModules}
                        />
                        <Grid container spacing={8}>
                          {Object.entries(secondaryModulesByPath).map(
                            ([secondaryPath, secondaryModulesAtPath]) => {
                              // See https://github.com/ReactTraining/react-router/pull/5889
                              const secondaryPathsToMatch = Array.from(
                                new Set(
                                  getModulePathsToMatch(secondaryModulesAtPath),
                                ),
                              );
                              if (secondaryPath === primaryPath) {
                                secondaryPathsToMatch.push(
                                  Array.from(
                                    new Set(getModuleRoutes(primaryModules)),
                                  ),
                                );
                              }
                              return (
                                <Route
                                  exact
                                  path={secondaryPathsToMatch}
                                  key={secondaryPath}
                                  render={({ match, history }) => (
                                    <ModulesAtPath
                                      modules={secondaryModulesAtPath}
                                      path={secondaryPath}
                                      match={match}
                                      history={history}
                                    />
                                  )}
                                />
                              );
                            },
                          )}
                        </Grid>
                      </Grid>
                    </>
                  )}
                />
              );
            },
          )}
        </Switch>
      </Grid>
    </main>
  );
};

export default withStyles(styles)(PrimaryNavContainer);
