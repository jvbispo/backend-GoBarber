import { container } from 'tsyringe';
import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

export default container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
