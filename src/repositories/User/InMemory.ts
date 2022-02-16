import { User } from "@entities/Users/types";
import { RepositoryInMemory } from "@repositories/InMemory";
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserRepository,
  UserReturned,
} from "./types";

class UserInMemory
  extends RepositoryInMemory<UserReturned, CreateUserDTO, UpdateUserDTO, User>
  implements UserRepository
{
  constructor() {
    super([], ["id", "name", "email", "isAdmin", "isActive"], {
      id: "",
      name: "",
      email: "",
      password: "",
      isAdmin: false,
      isActive: false,
      hashForgottenPassword: null,
      activationToken: null,
    });
  }
}
export default new UserInMemory();
