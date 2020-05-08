import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/providers/storageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  user_id: string;
  avatarFileName: string;
}
@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private diskStorageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFileName,
  }: IRequestDTO): Promise<User> {
    const user = await this.userRepository.findOne(user_id);

    if (!user) {
      throw new Error('only autenticated users can update avatar');
    }

    if (user.avatar) {
      await this.diskStorageProvider.deleteFile(user.avatar);
    }
    const fileName = await this.diskStorageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
