import React, { Suspense, lazy } from "react";
import { Center } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FallbackProgress from "./FallbackProgress";

const Dashboard = lazy(() => import("./Dashboard"));

const AppRoute: React.FC<{}> = () => (
  <Router>
    <Suspense
      fallback={
        <Center minHeight="100vh">
          <FallbackProgress />
        </Center>
      }
    >
      <Switch>
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </Suspense>
  </Router>
);

export default AppRoute;
