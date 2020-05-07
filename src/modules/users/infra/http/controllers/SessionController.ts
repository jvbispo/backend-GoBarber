import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionService from '../../../services/CreateSessonService';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const createSession = container.resolve(CreateSessionService);

      const { user, token } = await createSession.execute({ email, password });
      console.log(token);
      return res.json({ user, token });
    } catch (err) {
      return res.json({ error: err.mesage });
    }
  }
}
