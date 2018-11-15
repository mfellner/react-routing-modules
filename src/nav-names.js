import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

const navNames = {
  '/home': <HomeIcon />,
  '/users/lookup': <SearchIcon />,
  '/users/:id': 'Customer details',
  '/users/:id/transactions': 'Transactions',
  '/users/:id/products': 'Products',
};

export const navNameForPath = (modules, path) =>
  navNames[path] ||
  modules
    .filter(m => m.path === path)
    .map(m => m.showInNavigation)
    .find(s => typeof s === 'string') ||
  path;
