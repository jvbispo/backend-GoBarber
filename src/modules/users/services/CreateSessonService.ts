import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import authConfig from '@config/authConfig';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const user = await this.userRepository.findByEamail(email);

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
