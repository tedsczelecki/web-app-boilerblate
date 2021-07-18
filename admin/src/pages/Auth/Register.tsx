import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { PasswordField } from 'components/FormElements';

const Login = () => {
  return (
    <Box>
      <Heading size="xl" mb={2} color="blue.400">
        Welcome!
      </Heading>
      <Heading size="md" mb={8}>
        Register to use our service or{` `}
        <Link
          as={RouterLink}
          to="/login"
          color="blue.400"
          textDecoration="underline"
        >
          login
        </Link>
      </Heading>
      <Box width="100%" backgroundColor="gray.700" p="4" borderRadius="md">
        <VStack spacing="6">
          <FormControl id="email">
            <FormLabel>Name</FormLabel>
            <Input name="name" type="text" autoComplete="name" required />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input name="email" type="email" autoComplete="email" required />
          </FormControl>
          <PasswordField showForgotPassword={false} />
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            width="100%"
          >
            Register
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
