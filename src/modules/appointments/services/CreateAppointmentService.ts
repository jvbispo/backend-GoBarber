import { startOfHour, getHours, isAfter, format } from 'date-fns';

import { injectable, inject } from 'tsyringe';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICacheProvider from '@shared/providers/cacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsReposity';

interface IRequestDTO {
  user_id: string;
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
    @inject('NotificationRepository')
    private notificationsRepository: INotificationRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const currentDate = new Date(Date.now());
    const parsedDate = format(date, 'yyyy-M-d');

    if (
      getHours(appointmentDate) < 8 ||
      getHours(appointmentDate) > 18 ||
      isAfter(currentDate, appointmentDate)
    ) {
      throw new Error('not a valid date');
    }

    if (user_id === provider_id)
      throw new Error('you can not book an appointment with yourself');

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('this provider is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate,
    });

    const formatedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'H' ");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `novo agendamento para ${formatedDate} `,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${parsedDate}`,
    );
    return appointment;
  }
}

export default CreateAppointmentService;
