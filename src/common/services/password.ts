import { generate, verify } from "password-hash";

export class Password {
  static async toHash(password: string) {
    return generate(password);
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return verify(suppliedPassword, storedPassword);
  }
}
