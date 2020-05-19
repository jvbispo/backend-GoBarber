import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateAvatarService from '../../../services/UpdateAvatarService';

export default class SessionController {
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const updateAvatarService = container.resolve(UpdateAvatarService);

      const user = await updateAvatarService.execute({
        user_id: req.user.id,
        avatarFileName: req.file.filename,
      });

      return res.json(classToClass(user));
    } catch (err) {
      throw new Error(err);
    }
  }
}
