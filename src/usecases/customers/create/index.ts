import { IEncrypterAsync } from "@helpers/Encrypter/types";
import { IMailSender } from "@helpers/MailSender";
import { ICreateUserToken } from "@helpers/utils";
import { UserRepository } from "@repositories/User/types";
import {
  Customer,
  CustomerCreateDTO,
  Dependencies,
  ICreateCustomerUseCase,
} from "./types";
/* Passos
verificar se campos são válidos
fazer tratamento dos campos caso se aplique
verificar se email do usuário existe, considerar email único
criptografar a senha
excluir o campo confirmPassword
persistência do usuário
gerar token de acesso
envia email
*/
export const ERROR_USER_NAME_INVALID = "Usuário precisa de ter um nome válido";
export const ERROR_USER_PASSWORD_INVALID =
  "A senha e confirmação saõ diferentes";
export const ERROR_USER_ALREADY_EXISTS = "O usuário já existe";
export const TIME_IN_HOURS_TOKEN = 24;
class CreateCustomerUseCase implements ICreateCustomerUseCase {
  private readonly repository: UserRepository;
  private readonly tokenizator: ICreateUserToken;
  private readonly encrypter: IEncrypterAsync;
  private readonly mailSender: IMailSender;
  constructor(dependencies: Dependencies) {
    this.repository = dependencies.repository;
    this.encrypter = dependencies.encrypter;
    this.tokenizator = dependencies.tokenizator;
    this.mailSender = dependencies.mailSender;
  }
  async handle(userDTO: CustomerCreateDTO): Promise<Customer> {
    this.validate(userDTO);

    const userReturned = await this.repository.getBy({
      columnName: "email",
      columnValue: userDTO.email,
    });
    if (userReturned) {
      throw new Error(ERROR_USER_ALREADY_EXISTS);
    }

    const userToCreate = userDTO;
    userToCreate.password = await this.encrypter.encrypt(userDTO.password);
    delete userToCreate.confirmPassword;

    const userCreated = await this.repository.create(userToCreate);

    const token = this.tokenizator.create(userCreated, TIME_IN_HOURS_TOKEN);

    this.mailSender.send({
      from: "email@email.com",
      to: "teste@email.com",
      subject: "E-mail de teste",
      html: "<h1>Teste<h1>",
    });
    return {
      ...userCreated,
      token,
    };
  }
  private validate(userDTO: CustomerCreateDTO): boolean {
    if (userDTO.name == undefined) {
      throw new Error(ERROR_USER_NAME_INVALID);
    }
    if (!userDTO.name.match(/\D/)) {
      throw new Error(ERROR_USER_NAME_INVALID);
    }
    if (userDTO.password != userDTO.confirmPassword) {
      throw new Error(ERROR_USER_PASSWORD_INVALID);
    }
    return true;
  }
}

export default CreateCustomerUseCase;
