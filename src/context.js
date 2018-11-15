import React from 'react';

const ModuleContext = React.createContext([]);

const ModuleConsumer = ModuleContext.Consumer;

export const ModuleProvider = ModuleContext.Provider;

export const withModules = WrappedComponent => props => (
  <ModuleConsumer>
    {modules => <WrappedComponent modules={modules} {...props} />}
  </ModuleConsumer>
);
