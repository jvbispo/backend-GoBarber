import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/providers/cacheProvider/models/ICacheProvider';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(except_user_id?: string): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${except_user_id}`,
    );

    if (!users) {
      users = await this.userRepository.findAllProviders(except_user_id);
    }

    await this.cacheProvider.save(`providers-list:${except_user_id}`, users);

    return users;
  }
}

export default ListProvidersService;
