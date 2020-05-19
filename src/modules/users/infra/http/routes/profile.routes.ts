import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import ProfileController from '../controllers/ProfileController';

import authMiddlware from '../middlwares/authMiddlware';

const profileController = new ProfileController();
const profileRouter = Router();
profileRouter.put(
  '/',
  authMiddlware,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email(),
      name: Joi.string(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

profileRouter.get('/avatar', authMiddlware, profileController.show);

export default profileRouter;
