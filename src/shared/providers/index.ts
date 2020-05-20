import { container } from 'tsyringe';
import './storageProvider/index';
import './cacheProvider';

import EtherealMailProvider from './mailProvider/implementations/EtherealMailProvider';
import IMailProvider from './mailProvider/models/IMailProvider';

import HandlebarsMailTemplateProvider from './mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './mailTemplateProvider/models/IMailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
