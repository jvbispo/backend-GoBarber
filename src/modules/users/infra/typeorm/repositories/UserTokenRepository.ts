import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = await this.ormRepository.findOne({ where: { token } });

    return findToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const token = this.ormRepository.create({ user_id });

    await this.ormRepository.save(token);

    return token;
  }
}

export default UserTokenRepository;
