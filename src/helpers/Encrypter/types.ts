export interface IEncrypter {
  encrypt(value: string): string;
  compare(valueToCompare: string, originalEncrypted: string): boolean;
}
export interface IEncrypterAsync {
  encrypt(value: string): Promise<string>;
  compare(valueToCompare: string, originalEncrypted: string): Promise<boolean>;
}
