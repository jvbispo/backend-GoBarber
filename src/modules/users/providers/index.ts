import { container } from 'tsyringe';
import HashProvider from './hashProvider/implementations/HashProvider';
import IHashProvider from './hashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
