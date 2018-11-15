import React from 'react';
import urljoin from 'url-join';
import { Link } from 'react-router-dom';

const RelativeLinkContext = React.createContext({});

const RelativeLinkContextConsumer = RelativeLinkContext.Consumer;

export const RelativeLinkProvider = RelativeLinkContext.Provider;

function resolveParameterizedPath(path, params) {
  let matchedPath = path;
  for (const [key, value] of Object.entries(params)) {
    matchedPath = matchedPath.replace(':' + key, value);
  }
  return matchedPath;
}

export const RelativeLink = ({ to, ...restProps }) => (
  <RelativeLinkContextConsumer>
    {({ path, match }) => (
      <Link
        to={urljoin(resolveParameterizedPath(path, match.params), to)}
        {...restProps}
      />
    )}
  </RelativeLinkContextConsumer>
);

export const withRoute = WrappedComponent => props => (
  <RelativeLinkContextConsumer>
    {({ path, match, history }) => {
      const resolvedPath = resolveParameterizedPath(path, match.params);
      return (
        <WrappedComponent
          path={path}
          pushHistory={state =>
            history.push(urljoin(resolvedPath, state === '/' ? '' : state))
          }
          match={{
            ...match,
            path: match.path.replace(path, '') || '/',
            url: match.url.replace(resolvedPath, '') || '/',
          }}
          {...props}
        />
      );
    }}
  </RelativeLinkContextConsumer>
);
