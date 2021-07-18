import React from 'react';
import { Box, Button, HStack, useToast } from '@chakra-ui/react';
import { Card, PageTitle } from 'components/PageElements';
import { gql, useMutation } from '@apollo/client';
import { BreadCrumb, Post, PostByIdPayload } from '@types';
import { Form } from 'components/Form';
import { postFormData } from 'constants/forms';
import useEditPageContent from 'hooks/useEditPageContent';
import { DASHBOARD_PATH, POST_PATH, POSTS_PATH } from 'constants/routePaths';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeDialog, openDialog } from '../../store/actions';
import { DIALOG_TYPE_ALERT } from '../../constants/redux';
import { TOAST_DURATION } from '../../constants/animations';

const FORM_ID = 'edit-post-form';
const breadcrumb: BreadCrumb[] = [
  {
    label: 'Dashboard',
    link: DASHBOARD_PATH,
  },
  {
    label: 'Posts',
    link: POSTS_PATH,
  },
];

const GET_POST = gql`
  query PostById($id: Int) {
    postById(id: $id) {
      id
      title
      content
      published
    }
  }
`;

const UPDATE_POST = gql`
  mutation PostById($data: PostUpdateInput!) {
    postById(data: $data) {
      id
      title
      content
      published
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePostById($id: Int!) {
    deletePostById(id: $id) {
      id
    }
  }
`;

const PageTitleActions = ({
  isCreating = false,
  pageId,
}: {
  isCreating?: boolean;
  pageId: number;
}) => {
  const [onDelete] = useMutation(DELETE_POST);
  const { push } = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleDeleteClick = async () => {
    dispatch(
      openDialog({
        confirmLabel: 'Delete',
        content: 'Are you sure you want to delete this post?',
        onConfirm: async () => {
          try {
            await onDelete({
              variables: {
                id: pageId,
              },
            });
            toast({
              title: 'Post deleted successfully',
              status: 'success',
              duration: TOAST_DURATION,
              isClosable: true,
            });
            dispatch(closeDialog());
            push(POSTS_PATH);
          } catch (e) {}
        },
        title: 'Confirm delete',
        type: DIALOG_TYPE_ALERT,
      }),
    );
  };

  return (
    <HStack>
      {pageId && (
        <Button colorScheme="red" variant="ghost" onClick={handleDeleteClick}>
          Delete
        </Button>
      )}
      <Button colorScheme="blue" form={FORM_ID} type="submit">
        {isCreating ? 'Create' : 'Save'}
      </Button>
    </HStack>
  );
};

const PostPage = () => {
  const { data, isCreating, loading, pageId, onSubmit } = useEditPageContent<
    PostByIdPayload,
    Post
  >({
    mutation: UPDATE_POST,
    query: GET_POST,
    resourceUrl: `${POST_PATH}/{{id}}`,
  });

  if (loading) {
    return null;
  }

  const post = data?.postById;
  const pageTitleText = isCreating ? 'Create a new post' : post?.title;

  return (
    <Box>
      <Box mb="4">
        <PageTitle
          actions={<PageTitleActions isCreating={isCreating} pageId={pageId} />}
          breadcrumb={breadcrumb}
          text={pageTitleText}
        />
      </Box>
      <Card>
        <Form<Post>
          formData={postFormData}
          formId={FORM_ID}
          initialValues={post}
          onSubmit={onSubmit}
          showSubmitButton={false}
        />
      </Card>
    </Box>
  );
};

export default PostPage;
