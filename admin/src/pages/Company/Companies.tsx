import React from 'react';
import { Box } from '@chakra-ui/react';
import { Card, PageTitle } from 'components/PageElements';

const CompaniesPage = () => {
  return (
    <Box>
      <Box mb="4">
        <PageTitle subText="Companies that you have added." text="Companies" />
      </Box>
      <Card>Companies</Card>
    </Box>
  );
};

export default CompaniesPage;
