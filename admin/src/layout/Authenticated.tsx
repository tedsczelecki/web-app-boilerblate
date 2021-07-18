import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { Sidebar } from 'components/Navigation';

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid templateColumns="250px minmax(100px, 1fr)" gap="8" overflowX="hidden">
      <Sidebar />
      <Box p="8" pl="0" maxWidth="1400px" width="100%" mx="auto">
        {children}
      </Box>
    </Grid>
  );
};

export default AuthenticatedLayout;
