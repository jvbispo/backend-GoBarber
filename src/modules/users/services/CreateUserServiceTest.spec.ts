import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'joao',
      email: 'joao@oi.com',
      password: '112233',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with a existing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'joao',
      email: 'joao@oi.com',
      password: '112233',
    });

    expect(
      createUserService.execute({
        name: 'joao',
        email: 'joao@oi.com',
        password: '112233',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
