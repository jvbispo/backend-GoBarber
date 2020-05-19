import { Request, Response } from 'express';
import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilitysController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { provider_id } = req.params;
      const { year, month, day } = req.body;

      const listProviderDayAvailability = container.resolve(
        ListProviderDayAvailability,
      );

      const providerAvailability = await listProviderDayAvailability.execute({
        provider_id,
        day,
        month,
        year,
      });

      return res.json(providerAvailability);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
