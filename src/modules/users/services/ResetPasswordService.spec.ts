import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fake/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import HashProviderFake from '../providers/hashProvider/fakes/HashProviderFake';

let usersRepository: FakeUsersRepository;
let fakeHashProvider: HashProviderFake;
let usersTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
describe('ResetPassword', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    fakeHashProvider = new HashProviderFake();
    usersTokensRepository = new FakeUserTokensRepository();
    resetPasswordService = new ResetPasswordService(
      usersRepository,
      usersTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password ', async () => {
    const user = await usersRepository.create({
      name: 'john',
      email: 'john@test.com',
      password: '123456',
    });

    const { token } = await usersTokensRepository.generate(user.id);

    await resetPasswordService.execute({ password: '123123', token });

    const updatedUser = await usersRepository.findOne(user.id);

    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with a non-existing token', async () => {
    expect(
      resetPasswordService.execute({
        password: '123123',
        token: 'token Aleatorio',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to reset a non-existing user', async () => {
    const { token } = await usersTokensRepository.generate('token aleatorio');

    expect(
      resetPasswordService.execute({ password: '123123', token }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to reset password 2 hours after the token being generated', async () => {
    const user = await usersRepository.create({
      name: 'john',
      email: 'john@test.com',
      password: '123456',
    });
    const { token } = await usersTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
