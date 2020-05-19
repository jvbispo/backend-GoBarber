import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppointmentsReposity';

interface IRequestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { provider_id, day, month, year },
    );

    const hourStart = 8;
    const currentDate = new Date(Date.now());
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment => {
        return getHours(appointment.date) === hour;
      });

      const appointmentDate = new Date(year, month - 1, day, hour);
      return {
        hour,
        available:
          !hasAppointmentInHour && isAfter(appointmentDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
