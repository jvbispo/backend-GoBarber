import { Router } from 'express';
import CreateSessionService from '../services/CreateSessonService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const createSession = new CreateSessionService();

    const { user, token } = await createSession.execute({ email, password });
    console.log(token);
    return res.json({ user, token });
  } catch (err) {
    return res.json({ error: err.mesage });
  }
});

export default sessionsRouter;
