import { Router } from 'express';

import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import authMiddlware from '../middlwares/authMiddlware';
import uploadConfig from '../config/upload';
import UpdateAvatarService from '../services/UpdateAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);
usersRouter.post('/', async (req, res) => {
  try {
    const userService = new CreateUserService();

    const { name, email, password } = req.body;

    const user = await userService.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  } catch (err) {
    return res.json({ error: err.mesage });
  }
});

usersRouter.patch(
  '/avatar',
  authMiddlware,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateAvatarService = new UpdateAvatarService();

      const user = await updateAvatarService.execute({
        user_id: req.user.id,
        avatarFileName: req.file.filename,
      });

      delete user.password;
      delete user.created_at;
      delete user.updated_at;

      return res.json(user);
    } catch (err) {
      throw new Error(err);
    }
  },
);

export default usersRouter;
