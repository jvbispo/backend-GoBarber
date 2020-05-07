import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAvatarService from '../../../services/UpdateAvatarService';

export default class SessionController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateAvatarService = container.resolve(UpdateAvatarService);

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
  }
}
