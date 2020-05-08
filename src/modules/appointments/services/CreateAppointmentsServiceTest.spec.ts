import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('shoud be able to create an appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1122',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1122');
  });

  it('should not be able to create two appointments at the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    await createAppointment.execute({
      date: new Date(2020, 4, 4, 11),
      provider_id: '1122',
    });

    expect(
      createAppointment.execute({
        date: new Date(2020, 4, 4, 11),
        provider_id: '1122',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
