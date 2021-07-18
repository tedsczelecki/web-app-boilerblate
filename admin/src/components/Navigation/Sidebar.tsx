import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Text,
  VStack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react';
import Logo from './Logo';
import { sidebarNavigation } from 'constants/navigation';
import { useHistory } from 'react-router-dom';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { LIGHT_MODE } from '../../constants';
import useUser from 'hooks/useUser';
import { removeUserToken } from 'utils/storage';

const Sidebar = () => {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode();
  const isLightMode = colorMode === LIGHT_MODE;
  const headerColor = useColorModeValue('gray.400', 'gray.600');
  const me = useUser();

  const handleLogoutClick = () => {
    removeUserToken();
    if (window?.location?.href) {
      window.location.href = '/';
    }
  };

  return (
    <VStack
      backgroundColor={useColorModeValue('gray.100', 'gray.900')}
      height="100vh"
      spacing={5}
      p={5}
      alignItems="flex-start"
      width="100%"
    >
      <Box as={Logo} />
      <Divider pt="3" />
      <Box flex="1" width="100%">
        {sidebarNavigation.map(({ label, links }) => (
          <Box pb="8" key={label}>
            <Text
              color={headerColor}
              fontSize="sm"
              textTransform="uppercase"
              pb="2"
            >
              {label}
            </Text>
            <VStack alignItems="flex-start" ml="-3">
              {links.map(({ href, icon, label }) => (
                <Button
                  alignItems="center"
                  leftIcon={<Icon as={icon} />}
                  justifyContent="flex-start"
                  key={label}
                  onClick={() => history.push(href)}
                  size="sm"
                  textDecoration="none"
                  variant="ghost"
                  width="100%"
                >
                  <Text>{label}</Text>
                </Button>
              ))}
            </VStack>
          </Box>
        ))}
      </Box>
      <Box width="100%">
        <Menu>
          <MenuButton
            as={Button}
            justifyContent="flex-start"
            rightIcon={<ChevronDownIcon />}
            px={2}
            size="lg"
            textAlign="left"
            width="100%"
          >
            <HStack>
              <Avatar name={me?.username || me?.email} size="xs" />
              <Text fontSize="sm">{me?.username || me?.email}</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={isLightMode ? <MoonIcon /> : <SunIcon />}
              mb={2}
              onClick={toggleColorMode}
            >
              {isLightMode ? 'Dark mode' : 'Light mode'}
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => history.push('/settings')}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </VStack>
  );
};

export default Sidebar;
