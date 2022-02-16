import { User } from "@entities/Users/types";

export interface UserRepository {
  create(user: CreateUserDTO): UserReturned;
  update(user: UpdateUserDTO): UserReturned;
  getById(id: string): UserReturned;
  getBy(params: GetByDTO): UserReturned[];
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
