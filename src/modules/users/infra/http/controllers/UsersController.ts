import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const userService = container.resolve(CreateUserService);

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
  }
}
