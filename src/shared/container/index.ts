import { container } from 'tsyringe';
import '@modules/users/providers/index';
import '../providers/index';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsReposity';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
