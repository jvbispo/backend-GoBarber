import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/providers/mailProvider/models/IMailProvider';
import { resolve } from 'path';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error('user does not exists');

    const { token } = await this.userTokenRepository.generate(user.id);

    const templateFile = resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        template: templateFile,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password/?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
