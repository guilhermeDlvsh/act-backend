export interface ITokenGenerator {
  encode(value: object): string;
  decode(token: string): string;
}
