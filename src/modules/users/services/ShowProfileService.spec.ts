import 'reflect-metadata';
import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import User from '../infra/typeorm/entities/User';

let fakeUserRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });
  it('should be able to update user profile', async () => {
    const user = await fakeUserRepository.create({
      email: 'joao@oi.com',
      name: 'joao',
      password: '123456',
    });

    await expect(
      showProfileService.execute({
        user_id: user.id,
      }),
    ).resolves.toBeInstanceOf(User);
  });

  it('should be able to update user profile', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non existing user id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
