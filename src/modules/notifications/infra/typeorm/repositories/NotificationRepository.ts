import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { MongoRepository, getMongoRepository } from 'typeorm';
import Notification from '../schemas/Notification';

export default class NotificationRepository implements INotificationRepository {
  private notificationRepository: MongoRepository<Notification>;

  constructor() {
    this.notificationRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.notificationRepository.create({
      content,
      recipient_id,
    });

    await this.notificationRepository.save(notification);
    return notification;
  }
}
