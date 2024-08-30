import { faker } from '@faker-js/faker'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.sentence(),
      recipientId: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id,
  )

  return notification
}
