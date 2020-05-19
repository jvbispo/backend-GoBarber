import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { year, month, day } = req.body;
      const provider_id = req.user.id;

      const listProviderAppointments = container.resolve(
        ListProviderAppointmentsService,
      );

      const appointments = await listProviderAppointments.execute({
        provider_id,
        day,
        year,
        month,
      });

      return res.json(appointments);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
