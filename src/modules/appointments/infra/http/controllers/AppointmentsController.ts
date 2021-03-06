import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { provider_id, date } = req.body;
      const user_id = req.user.id;

      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.execute({
        provider_id,
        user_id,
        date,
      });

      return res.json(appointment);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
