import 'reflect-metadata';
import HashProviderFake from '../providers/hashProvider/fakes/HashProviderFake';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: HashProviderFake;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new HashProviderFake();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update user profile', async () => {
    const user = await fakeUserRepository.create({
      email: 'joao@oi.com',
      name: 'joao',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'joao1@oi.com',
      name: 'joao atualizado',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.name).toBe('joao atualizado');
    expect(updatedUser.email).toBe('joao1@oi.com');
  });

  it('should not be able to update email if it belongs to another user', async () => {
    const user = await fakeUserRepository.create({
      email: 'joao@oi.com',
      name: 'joao',
      password: '123456',
    });

    await fakeUserRepository.create({
      email: 'joao1@oi.com',
      name: 'joaozin',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'joao1@oi.com',
        name: 'joao atualizado',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update password without sending old password', async () => {
    const user = await fakeUserRepository.create({
      email: 'joao@oi.com',
      name: 'joao',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'joao1@oi.com',
        name: 'joao atualizado',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      email: 'joao@oi.com',
      name: 'joao',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'joao1@oi.com',
        name: 'joao atualizado',
        old_password: 'wrong password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update profile if user does not exists', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'id aleatorio',
        email: 'joao1@oi.com',
        name: 'joao atualizado',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
