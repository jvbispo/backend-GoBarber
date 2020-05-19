import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationRepository: FakeNotificationRepository;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
    );
  });

  it('shoud be able to create an appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 20, 8).getTime());

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 20, 11),
      user_id: '111',
      provider_id: '1122',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1122');
    expect(appointment.user_id).toBe('111');
  });

  it('shoud not be able to create an appointment with same user and provider id', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(),
        user_id: '1122',
        provider_id: '1122',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('shoud be able to create an appointment only between 8h and 18h', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 20, 20),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(Error);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 20, 7),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('shoud not be able to create an appointment in a past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 20, 8).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 19, 22),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create two appointments at the same date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 4, 8).getTime());

    await createAppointment.execute({
      user_id: '111',
      date: new Date(2020, 4, 4, 11),
      provider_id: '1122',
    });

    expect(
      createAppointment.execute({
        date: new Date(2020, 4, 4, 11),
        user_id: '111',
        provider_id: '1122',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
