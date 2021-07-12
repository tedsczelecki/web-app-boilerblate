import * as React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#F00',
    800: '#0F0',
    700: '#00F',
  },
};

const fonts = {
  body: '"Lato", sans-serif;',
  heading: '"Lato", sans-serif;',
};

const theme = extendTheme({ colors, fonts });

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  return (
    <ChakraProvider theme={theme}>
      {React.Children.only(props.children)}
    </ChakraProvider>
  );
};
