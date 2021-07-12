import React from 'react';
import { Box } from '@chakra-ui/react';
import { Card, PageTitle } from 'components/PageElements';

const EmployeesPage = () => {
  return (
    <Box>
      <Box mb="4">
        <PageTitle subText="Employees that you have added." text="Employees" />
      </Box>
      <Card>Employees</Card>
    </Box>
  );
};

export default EmployeesPage;
