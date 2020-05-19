import { Request, Response } from 'express';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { container } from 'tsyringe';

class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;
    const resetPasswordService = container.resolve(ResetPasswordService);

    try {
      resetPasswordService.execute({
        password,
        token,
      });
    } catch (err) {
      return res.json({ error: err.message });
    }
    return res.status(204).json();
  }
}

export default ResetPasswordController;
