import { User } from "@entities/Users/types";
import { Encrypter } from "@helpers/Encrypter/types";
import { MailSender } from "@helpers/MailSender/types";
import { ICreateUserToken } from "@helpers/utils";
import { UserRepository } from "@repositories/User/types";

export interface CreateCustomerConstructor {
  new (dependencies: Dependencies): ICreateCustomerUseCase;
}
export type Dependencies = {
  repository: UserRepository;
  encrypter: Encrypter;
  tokenizator: ICreateUserToken;
  mailSender: MailSender;
};
export interface ICreateCustomerUseCase {
  handle(userDTO: CustomerCreateDTO): Promise<Customer>;
}

export type CustomerCreateDTO = {
  name: User["name"];
  email: User["email"];
  password: User["password"];
  confirmPassword?: string;
};

export type Customer = {
  name: CustomerCreateDTO["name"];
  email: CustomerCreateDTO["email"];
  id: User["id"];
  token: string;
};
