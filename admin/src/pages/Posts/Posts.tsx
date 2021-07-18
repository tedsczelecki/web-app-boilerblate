import React from 'react';
import {
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { MdClear, MdDone } from 'react-icons/md';
import { Card, PageTitle } from 'components/PageElements';
import { gql, useQuery } from '@apollo/client';
import { PostsPayload } from '@types';
import formatDistance from 'date-fns/formatDistance';
import { useHistory } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';

const GET_POSTS = gql`
  query {
    posts {
      id
      createdAt
      title
      content
      published
    }
  }
`;

type ActionsDropdownProps = {
  id: number;
};

const ActionsDropdown = ({ id }: ActionsDropdownProps) => {
  const { push } = useHistory();

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => push(`/post/${id}`)}>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

const PageTitleActions = () => {
  const { push } = useHistory();

  return (
    <HStack>
      <Button onClick={() => push('/post')}>Create new</Button>
    </HStack>
  );
};

const PostsPage = () => {
  const { loading, data } = useQuery<PostsPayload>(GET_POSTS, {
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return null;
  }

  return (
    <Box>
      <Box mb="4">
        <PageTitle
          actions={<PageTitleActions />}
          subText="Posts that you have added."
          text="Posts"
        />
      </Box>
      <Card>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Content</Th>
              <Th>Published</Th>
              <Th>Created</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.posts.map(({ content, createdAt, published, id, title }) => (
              <Tr key={id}>
                <Td>{title}</Td>
                <Td>{content}</Td>
                <Td>
                  <Icon as={published ? MdDone : MdClear} />
                </Td>
                <Td>{formatDistance(new Date(), new Date(createdAt || ''))}</Td>
                <Td>
                  <ActionsDropdown id={id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </Box>
  );
};

export default PostsPage;
