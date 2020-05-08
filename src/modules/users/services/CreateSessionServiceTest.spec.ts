import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import CreateSessionService from './CreateSessonService';
import HashProvider from '../providers/hashProvider/fakes/HashProviderFake';
import UserRepository from '../repositories/fake/FakeUsersRepository';

describe('CreateSession', () => {
  it('should be able to create a session', async () => {
    const fakeUserRespository = new UserRepository();
    const fakeHashProvider = new HashProvider();
    const createUserService = new CreateUserService(
      fakeUserRespository,
      fakeHashProvider,
    );
    const createSessionService = new CreateSessionService(
      fakeUserRespository,
      fakeHashProvider,
    );

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
    const fakeUserRespository = new UserRepository();
    const fakeHashProvider = new HashProvider();
    const createUserService = new CreateUserService(
      fakeUserRespository,
      fakeHashProvider,
    );
    const createSessionService = new CreateSessionService(
      fakeUserRespository,
      fakeHashProvider,
    );

    expect(
      createSessionService.execute({
        email: 'alo@oi.com',
        password: '112233',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a session with a wrong user password', async () => {
    const fakeUserRespository = new UserRepository();
    const fakeHashProvider = new HashProvider();
    const createUserService = new CreateUserService(
      fakeUserRespository,
      fakeHashProvider,
    );
    const createSessionService = new CreateSessionService(
      fakeUserRespository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'joao',
      email: 'alo@oi.com',
      password: '112233',
    });

    expect(
      createSessionService.execute({
        email: 'alo@oi.com',
        password: 'senha',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
