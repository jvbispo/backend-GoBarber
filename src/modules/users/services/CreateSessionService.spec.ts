import 'reflect-metadata';
import FakeCacheProvider from '@shared/providers/cacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';
import CreateSessionService from './CreateSessonService';
import HashProvider from '../providers/hashProvider/fakes/HashProviderFake';
import UserRepository from '../repositories/fake/FakeUsersRepository';

let fakeUserRespository: UserRepository;
let fakeHashProvider: HashProvider;
let createUserService: CreateUserService;
let createSessionService: CreateSessionService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUserRespository = new UserRepository();
    fakeHashProvider = new HashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUserRespository,
      fakeHashProvider,
      fakeCacheProvider,
    );
    createSessionService = new CreateSessionService(
      fakeUserRespository,
      fakeHashProvider,
    );
  });
  it('should be able to create a session', async () => {
    await createUserService.execute({
      name: 'joao',
      email: 'alo@oi.com',
      password: '112233',
    });

    const response = await createSessionService.execute({
      email: 'alo@oi.com',
      password: '112233',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to create a session with a non existing user', async () => {
    await expect(
      createSessionService.execute({
        email: 'alo@oi.com',
        password: '112233',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a session with a wrong user password', async () => {
    await createUserService.execute({
      name: 'joao',
      email: 'alo@oi.com',
      password: '112233',
    });

    await expect(
      createSessionService.execute({
        email: 'alo@oi.com',
        password: 'senha',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
