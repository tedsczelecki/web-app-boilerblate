import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { BreadCrumb } from '@types';
import { Link } from 'react-router-dom';

type pageTitleProps = {
  actions?: React.ReactElement;
  breadcrumb?: BreadCrumb[];
  subText?: string;
  text?: string;
};

const PageTitle = ({ actions, breadcrumb, subText, text }: pageTitleProps) => {
  return (
    <VStack width="100%" alignItems="start">
      {breadcrumb && (
        <Breadcrumb
          spacing={3}
          separator={<ChevronRightIcon color="gray.500" />}
        >
          {breadcrumb.map(({ link, label }) => (
            <BreadcrumbItem key={label}>
              <BreadcrumbLink as={Link} to={link}>
                {label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}
      <HStack pb="3" justifyContent="space-between" width="100%">
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
    </VStack>
  );
};

export default PageTitle;
