import { User } from "@entities/Users/types";
import { IMailSender } from "@helpers/MailSender/types";
import { ITokenGenerator } from "@helpers/TokenGenerator/types";
import { UserRepository } from "@repositories/User/types";

export interface ForgotPasswordConstructor {
  new (dependencies: Dependencies): ForgotPasswordUseCase;
}
type Dependencies = {
  repository: UserRepository;
  tokenizator: ITokenGenerator;
  mailSender: IMailSender;
};
export interface ForgotPasswordUseCase {
  handle(ForgotPasswordDTO: ForgotPasswordDTO): Promise<void>;
}

type ForgotPasswordDTO = {
  email: User["email"];
};
