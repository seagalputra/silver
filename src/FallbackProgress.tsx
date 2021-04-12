import React from "react";
import { Spinner } from "@chakra-ui/react";

const FallbackProgress = (): JSX.Element => (
  <Spinner
    size="xl"
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
  />
);

export default FallbackProgress;
