import FakeMailProvider from '@shared/providers/mailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fake/FakeUserTokensRepository';

let usersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      usersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover password with user email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    await usersRepository.create({
      name: 'john',
      email: 'john@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'john@test.com' });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover password with non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'john@test.com' }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await usersRepository.create({
      name: 'jhon',
      email: 'john@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'john@test.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
