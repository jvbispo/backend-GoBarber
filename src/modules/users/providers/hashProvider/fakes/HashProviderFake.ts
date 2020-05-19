import IHashProvider from '../models/IHashProvider';

class HashProviderFake implements IHashProvider {
  public async hash(password: string): Promise<string> {
    const hashedPassword = password;

    return hashedPassword;
  }

  public async compare(
    passwordHash: string,
    password: string,
  ): Promise<boolean> {
    const isEqual = password === passwordHash;
    return isEqual;
  }
}

export default HashProviderFake;
