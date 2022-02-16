import { UserDTO } from "@entities/Users/types";
import DateFunctions from "@helpers/DateHandler";
import TokenGenerator, { ITokenGenerator } from "../TokenGenerator";

export interface ICreateUserToken {
  create(user: UserDTO, timeInHours?: number): string;
}
export const TIME_IN_HOURS_DEFAULT = 24;

export class CreateUserToken implements ICreateUserToken {
  private readonly tokenGenerator: ITokenGenerator = new TokenGenerator();
  constructor() {}
  create(user: UserDTO, timeInHours?: number): string {
    const now = new Date();
    const toEncode = {
      iat: now.toISOString(),
      exp: new DateFunctions(now.toISOString()).add({ hours: timeInHours }),
      sub: user,
    };
    return this.tokenGenerator.encode(toEncode);
  }
}
export default new CreateUserToken();
