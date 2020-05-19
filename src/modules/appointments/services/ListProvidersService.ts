import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(except_user_id?: string): Promise<User[]> {
    const providers = await this.userRepository.findAllProviders(
      except_user_id,
    );

    return providers;
  }
}

export default ListProvidersService;
