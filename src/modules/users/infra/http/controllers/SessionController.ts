import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import CreateSessionService from '../../../services/CreateSessonService';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const createSession = container.resolve(CreateSessionService);

      const { user, token } = await createSession.execute({ email, password });

      return res.json({ user: classToClass(user), token });
    } catch (err) {
      return res.status(401).json({ error: err.mesage });
    }
  }
}
