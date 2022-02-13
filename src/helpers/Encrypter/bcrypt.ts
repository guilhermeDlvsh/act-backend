import bcrypt from "bcrypt";
import { IEncrypterAsync } from "./types";

const salt = 10;
class EncrypterBcrypt implements IEncrypterAsync {
  async encrypt(value: string): Promise<string> {
    const saltValue = await bcrypt.genSalt(salt);
    const hash = await bcrypt.hash(value, saltValue);
    return hash;
  }
  async compare(
    valueToCompare: string,
    originalEncrypted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(valueToCompare, originalEncrypted);
  }
}

export default EncrypterBcrypt;
