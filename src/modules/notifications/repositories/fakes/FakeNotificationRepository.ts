import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { ObjectID } from 'mongodb';
import Notification from '../../infra/typeorm/schemas/Notification';

export default class NotificationRepository implements INotificationRepository {
  private notificationRepository: Notification[];

  constructor() {
    this.notificationRepository = [];
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      recipient_id,
      content,
    });

    this.notificationRepository.push(notification);
    return notification;
  }
}
