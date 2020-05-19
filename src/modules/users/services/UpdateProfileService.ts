import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface IRequestDTO {
  user_id: string;
  name?: string;
  email?: string;
  old_password?: string;
  password?: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    name,
    old_password,
    password,
  }: IRequestDTO): Promise<User> {
    const user = await this.userRepository.findOne(user_id);

    if (!user) {
      throw new Error('only autenticated users can update profile');
    }

    if (email) {
      const existingEmail = await this.userRepository.findByEmail(email);
      if (existingEmail && existingEmail.email !== user.email) {
        throw new Error('email already being used');
      }
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      if (!old_password) {
        throw new Error('old password must be passed');
      }

      const isPassword = await this.hashProvider.compare(
        old_password,
        user.password,
      );

      if (!isPassword) throw new Error('Password does not match');

      user.password = await this.hashProvider.hash(password);
    }

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
