import { container } from 'tsyringe';
import upload from '@config/upload';
import DiskStorageProvider from './fakes/FakeDiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  DISK: DiskStorageProvider,
  S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[upload.driver],
);
