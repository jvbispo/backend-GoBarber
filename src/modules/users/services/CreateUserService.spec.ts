import FakeCacheProvider from '@shared/providers/cacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import HashProvider from '../providers/hashProvider/fakes/HashProviderFake';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: HashProvider;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeHashProvider = new HashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create a user', async () => {
    const user = await createUserService.execute({
      name: 'joao',
      email: 'joao@oi.com',
      password: '112233',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with a existing email', async () => {
    await createUserService.execute({
      name: 'joao',
      email: 'joao@oi.com',
      password: '112233',
    });

    await expect(
      createUserService.execute({
        name: 'joao',
        email: 'joao@oi.com',
        password: '112233',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
