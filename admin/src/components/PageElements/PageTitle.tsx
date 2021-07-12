import React from 'react';
import { Box, Divider, Heading, HStack, Text } from '@chakra-ui/react';

type pageTitleProps = {
  actions?: React.FC;
  subText?: string;
  text?: string;
};

const PageTitle = ({ actions, subText, text }: pageTitleProps) => {
  return (
    <>
      <HStack pb="3">
        <Box>
          {text && (
            <Heading size="lg" pb="1">
              {text}
            </Heading>
          )}
          {subText && <Text fontSize="sm">{subText}</Text>}
        </Box>
        {actions && <Box ml="auto">{actions}</Box>}
      </HStack>
      <Divider />
    </>
  );
};

export default PageTitle;
