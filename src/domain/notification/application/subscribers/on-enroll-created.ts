import { DomainEvents } from '@/core/events/domain-envets'
import { EventHandler } from '@/core/events/event-handler'
import { LessonsRepository } from '@/domain/event/application/repositories/lessons-repository'
import { EnrollCreatedEvent } from '@/domain/event/enterprise/events/enroll-created-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnEnrollCreated implements EventHandler {
  constructor(
    private lessonsRepository: LessonsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewEnrollNotification.bind(this),
      EnrollCreatedEvent.name,
    )
  }

  private async sendNewEnrollNotification({ enroll }: EnrollCreatedEvent) {
    const lesson = await this.lessonsRepository.findById(
      enroll.lessonId.toString(),
    )

    if (lesson) {
      await this.sendNotification.execute({
        recipientId: lesson.id.toString(),
        title: `New enrollment for "${lesson.title.substring(0, 40).concat('...')}"`,
        content: lesson.excerpt,
      })
    }
  }
}
