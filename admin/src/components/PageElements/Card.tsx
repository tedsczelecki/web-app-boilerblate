import React from 'react';
import { Box } from '@chakra-ui/react';

type cardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: cardProps) => {
  return (
    <Box p="3" backgroundColor="gray.700">
      {children}
    </Box>
  );
};

export default Card;
