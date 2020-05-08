import fs from 'fs';
import { resolve } from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.directory, file),
      resolve(uploadConfig.uploadDirectory, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadDirectory, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
