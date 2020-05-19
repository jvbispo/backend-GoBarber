import { Request, Response } from 'express';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { container } from 'tsyringe';

export default class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;

      const listProvidersService = container.resolve(ListProvidersService);

      const providers = await listProvidersService.execute(id);

      return res.json(providers);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
