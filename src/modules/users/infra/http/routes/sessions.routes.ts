import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import SessionController from '../controllers/SessionController';

const sessionController = new SessionController();
const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionsRouter;
