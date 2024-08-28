import { User } from "@prisma/client";

export type LoginForm = {
  email: string;
  password: string;
};

export type HandleRequestPayload = {
  user: User | null;
  imageId: string | null;
  message: string | null;
  phoneNumber: string;
};
