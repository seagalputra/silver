import React from 'react';
import { Spinner } from '@chakra-ui/react';

interface FallbackProgressProps {
  size: string;
}

const FallbackProgress = ({ size }: FallbackProgressProps): JSX.Element => (
  <Spinner
    size={size}
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
  />
);

export default FallbackProgress;
