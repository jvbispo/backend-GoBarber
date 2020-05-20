import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('UserToken')
    private usersTokenRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProviver: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new Error('token does not exists');
    }

    const user = await this.usersRepository.findOne(userToken.user_id);

    if (!user) {
      throw new Error('user does not exists');
    }

    const comparedDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), comparedDate)) {
      throw new Error('token expired');
    }

    user.password = await this.hashProviver.hash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
