// types para el usuario
export type User = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string;
  image: string;
  links: string;
};

// export type UserHandle = Omit<User, "_id | email" >;
export type UserHandle = Pick<
  User,
  "description" | "handle" | "image" | "name" | "links"
>;

export type RegisterForm = Pick<User, "name" | "email" | "handle"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type UserProfile = Pick<User, "handle" | "description">;

// types para los links
export type SocialNetwork = {
  // esta es la que se va a guardar en la BD
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevTreeLink = Pick<SocialNetwork, "name" | "url" | "enabled">;
