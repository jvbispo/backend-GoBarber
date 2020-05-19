import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '../../../services/UpdateProfileService';
import ShowProfileService from '../../../services/ShowProfileService';

export default class ProfileController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, old_password } = req.body;
      const user_id = req.user.id;

      const updateProfile = container.resolve(UpdateProfileService);

      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        password,
        old_password,
      });

      delete user.password;

      return res.json(user);
    } catch (err) {
      return res.json({ error: err.mesage });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const showProfile = container.resolve(ShowProfileService);
      const user_id = req.user.id;

      const user = await showProfile.execute({ user_id });

      return res.json(user);
    } catch (err) {
      return res.json({ error: err.mesage });
    }
  }
}
