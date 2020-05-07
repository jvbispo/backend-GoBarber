import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import authMiddlware from '../middlwares/authMiddlware';

const userAvatarController = new UserAvatarController();
const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  authMiddlware,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
