import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { getRepository } from 'typeorm';
import User from '../models/User';

import authConfig from '../config/authConfig';

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw Error("email/password doesn't match");
    }

    const passwordDecoded = await compare(password, user.password);

    if (!passwordDecoded) {
      throw new Error("email/password doesn't match");
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
