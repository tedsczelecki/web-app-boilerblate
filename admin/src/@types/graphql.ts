import { Post, User } from './data';

export type PostsPayload = {
  posts: Post[];
};

export type PostByIdPayload = {
  postById: Post;
};

export type GetMePayload = {
  getMe: User;
};
