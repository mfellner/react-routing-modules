import Home from './home';
import CustomerSearch from './customer-search';
import CustomerSummary from './customer-summary';
import CustomerProfile from './customer-profile';
import CustomerAccount from './customer-account';
import CustomerTransactions from './customer-transactions';
import CustomerProductBlack from './customer-product-black';

export default [
  {
    name: 'home',
    path: '/home',
    position: 0,
    showInNavigation: true,
    component: Home,
  },
  {
    name: 'customer-search',
    path: '/users/lookup',
    position: 0,
    showInNavigation: true,
    component: CustomerSearch,
  },
  {
    name: 'customer-summary',
    path: '/users/:id',
    position: 0,
    routes: ['/smoosh'],
    component: CustomerSummary,
  },
  {
    name: 'customer-profile',
    path: '/users/:id',
    position: 1,
    showInNavigation: true,
    component: CustomerProfile,
  },
  {
    name: 'customer-account',
    path: '/users/:id',
    position: 1,
    showInNavigation: true,
    component: CustomerAccount,
  },
  {
    name: 'customer-transactions',
    path: '/users/:id/transactions',
    position: 1,
    showInNavigation: true,
    component: CustomerTransactions,
  },
  {
    name: 'customer-product-black',
    path: '/users/:id/products',
    position: 1,
    showInNavigation: true,
    routes: ['/black/deactivate'],
    component: CustomerProductBlack,
  },
];
