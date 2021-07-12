import React from 'react';
import {
  Box,
  Heading,
  InputGroup,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import authBackground from 'images/auth-background.jpg';
import Logo from '../components/Navigation/Logo';

const UnauthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack
      height="100vh"
      width="100vw"
      overflow="hidden"
      justifyContent="center"
    >
      <Box flex={1} width="100%" height="100%">
        <Image
          src={authBackground}
          fit="cover"
          objectPosition="bottom"
          width="100%"
          height="100%"
        />
        <Box
          height="100%"
          width="100%"
          background="linear-gradient(180deg, rgba(26,32,44,1) 0%, rgba(255,255,255,0) 60%)"
          position="absolute"
          top={0}
          left={0}
        />
        <Box position="absolute" top={6} left={6} width="250px">
          <Logo fill="#fff" />
        </Box>
      </Box>
      <Box width="100%" maxWidth="600px" p={6} position="relative" z-index={9}>
        <Box mx="auto" width="100%" maxWidth="450px">
          {children}
        </Box>
      </Box>
    </HStack>
  );
};

export default UnauthenticatedLayout;
