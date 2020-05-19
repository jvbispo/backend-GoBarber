import { hash, compare } from 'bcrypt';
import IHashProvider from '../models/IHashProvider';

class HashProvider implements IHashProvider {
  public async hash(password: string): Promise<string> {
    const hashedPassword = await hash(password, 8);

    return hashedPassword;
  }

  public async compare(
    passwordHash: string,
    password: string,
  ): Promise<boolean> {
    const isPassword = await compare(password, passwordHash);

    return isPassword;
  }
}

export default HashProvider;
