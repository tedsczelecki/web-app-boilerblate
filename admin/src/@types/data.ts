export type User = {
  username?: string;
  email: string;
};

export type Post = {
  id: number;
  title?: string;
  content?: string;
  published?: boolean;
  updatedAt: string;
  createdAt: string;
};
