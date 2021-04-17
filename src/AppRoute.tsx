import React, { Suspense, lazy } from 'react';
import { Center } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FallbackProgress from './FallbackProgress';

const Dashboard = lazy(() => import('./Dashboard'));
const AddTransaction = lazy(() => import('./AddTransaction'));

const AppRoute = (): JSX.Element => (
  <Router>
    <Suspense
      fallback={
        <Center minHeight="100vh">
          <FallbackProgress size="xl" />
        </Center>
      }
    >
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/transaction/add" component={AddTransaction} />
      </Switch>
    </Suspense>
  </Router>
);

export default AppRoute;
