import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

type cardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: cardProps) => {
  const backgroundColor = useColorModeValue('gray.50', 'gray.700');
  return (
    <Box p="3" backgroundColor={backgroundColor}>
      {children}
    </Box>
  );
};

export default Card;
