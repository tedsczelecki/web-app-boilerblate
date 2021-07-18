import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { PasswordField } from 'components/FormElements';
import { useMutation } from '@apollo/client';
import { setUserToken } from 'utils/storage';

const LOGIN = gql`
  mutation LoginUser($data: UserLoginInput!) {
    loginUser(data: $data) {
      token
    }
  }
`;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data }] = useMutation(LOGIN);
  const { push } = useHistory();

  useEffect(() => {
    if (data?.loginUser?.token) {
      setUserToken(data?.loginUser?.token);
      push('/');
    }
  }, [data, push]);

  const handleClick = async () => {
    setError('');
    setIsLoading(true);
    try {
      await login({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
    } catch (e) {
      setError(e.message);
    }

    setIsLoading(false);
  };

  return (
    <Box>
      <Heading size="xl" mb={2} color="blue.400">
        Welcome back
      </Heading>
      <Heading size="md" mb={8}>
        Sign in to continue or{' '}
        <Link
          as={RouterLink}
          to="/register"
          color="blue.400"
          textDecoration="underline"
        >
          register
        </Link>
      </Heading>
      <Box width="100%" backgroundColor="gray.700" p="4" borderRadius="md">
        <VStack spacing="6">
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={evt => setEmail(evt.target.value)}
            />
          </FormControl>
          <PasswordField value={password} onChange={val => setPassword(val)} />
          {error && <Text color="red.400">{error}</Text>}
          <Button
            isLoading={isLoading}
            loadingText="Submitting"
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            width="100%"
            onClick={handleClick}
          >
            Log in
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
