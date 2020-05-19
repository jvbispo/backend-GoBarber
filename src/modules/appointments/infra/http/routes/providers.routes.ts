import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import authMiddlware from '@modules/users/infra/http/middlwares/authMiddlware';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailability from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailability from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailability();
const providerMonthAvailabilityController = new ProviderMonthAvailability();

providersRouter.use(authMiddlware);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.BODY]: {
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      provider_id: Joi.string().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.BODY]: {
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      provider_id: Joi.string().required(),
    },
  }),
  providerDayAvailabilityController.index,
);

export default providersRouter;
