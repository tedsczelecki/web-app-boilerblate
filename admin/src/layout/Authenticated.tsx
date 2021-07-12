import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { NavBar, Sidebar } from 'components/Navigation';
import { pageAnimationData } from '../constants/animations';
import { motion } from 'framer-motion';

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid templateColumns="250px minmax(100px, 1fr)" gap="8">
      <Sidebar />
      <Box p="8" pl="0" maxWidth="1400px" width="100%" mx="auto">
        {children}
      </Box>
    </Grid>
  );
};

export default AuthenticatedLayout;
