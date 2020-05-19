import multer, { StorageEngine } from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'S3' | 'DISK';
  directory: string;
  uploadDirectory: string;
  config: {
    disk: {
      storage: StorageEngine;
    };
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  directory: tmpFolder,
  uploadDirectory: resolve(tmpFolder, 'uploads'),

  config: {
    disk: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('HEX');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    },
    aws: {
      bucket: 'app-barber',
    },
  },
} as IUploadConfig;
