import { EncrypterBcrypt } from "./index";

function sut() {
  return new EncrypterBcrypt();
}

describe.skip("Bcrypt encrypter module", () => {
  it("should encrypt the value passed in", async () => {
    const test = sut();
    expect(await test.encrypt("teste")).toBeTruthy();
  });
  it("should return true if the value passed in is the same", async () => {
    const test = sut();
    const encrypted = await test.encrypt("teste");
    expect(await test.compare("teste", encrypted)).toEqual(true);
  });
});
