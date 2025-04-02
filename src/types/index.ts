export type User = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string;
  image: string;
};

export type RegisterForm = Pick<User, "name" | "email" | "handle"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type UserProfile = Pick<User, "handle" | "description">;
