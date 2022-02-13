import { ITokenGenerator } from "./types";
import jwt from "jsonwebtoken";

class TokenGeneratorJWT implements ITokenGenerator {
  private readonly secret: string = <string>process.env.API_SECRET;
  constructor() {
    if (process.env.API_SECRET == undefined) {
      throw new Error("API_SECRET not defined");
    }
  }
  encode(value: object): string {
    return jwt.sign(value, this.secret);
  }
  decode(token: string): string {
    return jwt.verify(token, this.secret);
  }
}

export default TokenGeneratorJWT;
