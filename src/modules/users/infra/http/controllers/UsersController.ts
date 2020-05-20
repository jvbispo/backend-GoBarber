import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
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
      return res.json(classToClass(user));
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
