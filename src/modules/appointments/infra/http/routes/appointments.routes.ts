import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddlware from '@modules/users/infra/http/middlwares/authMiddlware';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(authMiddlware);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get(
  '/me',
  celebrate({
    [Segments.HEADERS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      year: Joi.number().required(),
      month: Joi.number().required(),
      day: Joi.number().required(),
    },
  }),
  providerAppointmentsController.index,
);

export default appointmentsRouter;
