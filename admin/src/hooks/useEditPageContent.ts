import { useEffect } from 'react';
import omitDeep from 'omit-deep';
import { DocumentNode, useQuery, useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { TOAST_DURATION } from '../constants/animations';

type EditUrlParamsType = {
  id?: string;
};

type useEditPageContentProps = {
  errorMessage?: string;
  forwardOnCreate?: boolean;
  mutation: DocumentNode;
  query: DocumentNode;
  resourceUrl: string;
  successMessage?: string;
};

const useEditPageContent = <T, D>({
  errorMessage = 'There was an error',
  forwardOnCreate = true,
  mutation,
  query,
  resourceUrl,
  successMessage = 'Save successful',
}: useEditPageContentProps) => {
  const toast = useToast();
  const { push } = useHistory();
  const { id } = useParams<EditUrlParamsType>();
  const pageId = parseInt(id || '', 10);
  const [doMutation, { data: mutationData }] = useMutation(mutation);
  const { loading, data } = useQuery(query, {
    variables: {
      id: pageId,
    },
  });

  useEffect(() => {
    if (mutationData?.postById?.id && forwardOnCreate && !id) {
      push(resourceUrl.replace(/{{id}}/g, mutationData?.postById?.id));
    }
  }, [forwardOnCreate, mutationData?.postById?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async data => {
    try {
      await doMutation({
        variables: {
          data: omitDeep(data, ['__typename']),
        },
      });
      toast({
        title: successMessage,
        status: 'success',
        duration: TOAST_DURATION,
        isClosable: true,
      });
    } catch (e) {
      toast({
        description: e.message,
        title: errorMessage,
        status: 'success',
        duration: TOAST_DURATION,
        isClosable: true,
      });
    }
  };

  return {
    data: mutationData || data,
    isCreating: !Boolean(id) ?? true,
    loading,
    pageId,
    onSubmit,
  } as {
    data: T;
    isCreating: boolean;
    loading: boolean;
    pageId: number;
    onSubmit: (values: D) => void;
  };
};

export default useEditPageContent;
