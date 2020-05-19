import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { Joi, celebrate, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import authMiddlware from '../middlwares/authMiddlware';

const userAvatarController = new UserAvatarController();
const usersRouter = Router();
const upload = multer(uploadConfig.config.disk);
const usersController = new UsersController();
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  authMiddlware,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
