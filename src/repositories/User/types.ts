import { User } from "@entities/Users/types";

export interface UserRepository {
  create(user: CreateUserDTO): Promise<UserReturned>;
  update(id: string, user: UpdateUserDTO): Promise<UserReturned>;
  getById(id: string): Promise<UserReturned | null>;
  getBy(params: GetByDTO): Promise<UserReturned[]>;
}

export type UserReturned = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
};
export type CreateUserDTO = {
  name: User["name"];
  email: User["email"];
  password: User["password"];
};
export type UpdateUserDTO = {
  name: User["name"];
};
type GetByDTO = {
  columnName: keyof User;
  columnValue: User[GetByDTO["columnName"]];
};
