import { gql, useQuery } from '@apollo/client';
import { GetMePayload } from '../@types';

const GET_ME = gql`
  query {
    getMe {
      email
      username
    }
  }
`;

const useUser = () => {
  const { data } = useQuery<GetMePayload>(GET_ME);
  const me = data?.getMe ?? null;
  return me;
};

export default useUser;
