import { Request, Response } from 'express';
import ListProviderMonthAvailability from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { container } from 'tsyringe';

export default class ProviderMonthAvailabilitysController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { provider_id } = req.params;
      const { year, month } = req.body;

      const listProviderMonthAvailability = container.resolve(
        ListProviderMonthAvailability,
      );

      const providerAvailability = await listProviderMonthAvailability.execute({
        provider_id,
        month,
        year,
      });

      return res.json(providerAvailability);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
