import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw Error('email already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
