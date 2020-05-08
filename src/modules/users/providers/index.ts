import { container } from 'tsyringe';
import HashProvider from './hashProvider/implementations/HashProvider';
import IHashProvider from './hashProvider/models/IHashProvider';

export default container.registerSingleton<IHashProvider>(
  'HashProvider',
  HashProvider,
);
