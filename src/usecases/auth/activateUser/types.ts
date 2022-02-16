import { User } from "@entities/Users/types";
import { IMailSender } from "@helpers/MailSender/types";
import { UserRepository } from "@repositories/User/types";

export interface ActivateUserConstructor {
  new (dependencies: Dependencies): ActivateUserUseCase;
}
type Dependencies = {
  repository: UserRepository;
  mailSender: IMailSender;
};
export interface ActivateUserUseCase {
  handle(userDTO: ActivateUserDTO, activationToken: string): Promise<boolean>;
}

type ActivateUserDTO = {
  id: User["id"];
};
