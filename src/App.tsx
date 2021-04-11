import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import AppRoute from "./AppRoute";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppRoute />
  </ChakraProvider>
);
