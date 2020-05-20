import 'reflect-metadata';
import FakeStorageProvider from '@shared/providers/storageProvider/fakes/FakeDiskStorageProvider';
import UpdateAvatarService from './UpdateAvatarService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatarService: UpdateAvatarService;

describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateAvatarService = new UpdateAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update user avatar', async () => {
    const user = await fakeUserRepository.create({
      email: 'joao@oi.com',
      name: 'joao',
      password: '123456',
    });

    const updatedUser = await updateAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar',
    });

    expect(updatedUser).toHaveProperty('avatar');
  });

  it("should no be able to update a non existing user's avatar", async () => {
    await expect(
      updateAvatarService.execute({
        user_id: '123a',
        avatarFileName: 'avatar',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to delete an existing avatar when creating a new one', async () => {
    const deleteAvatar = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      email: 'joao@oi.com',
      name: 'joao',
      password: '123456',
    });

    await updateAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteAvatar).toBeCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
