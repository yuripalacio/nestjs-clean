import { OnEnrollCreated } from './on-enroll-created'
import { InMemoryEnrollsRepository } from 'test/repositories/in-memory-enrolls-repository'
import { InMemoryLessonsRepository } from 'test/repositories/in-memory-lessons-repository'
import { InMemoryLessonAttachmentsRepository } from 'test/repositories/in-memory-lesson-attachments-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeLesson } from 'test/factories/make-lesson'
import { MockInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { makeEnroll } from 'test/factories/make-enroll'

let inMemoryLessonAttachmentsRepository: InMemoryLessonAttachmentsRepository
let inMemoryLessonsRepository: InMemoryLessonsRepository
let inMemoryEnrollsRepository: InMemoryEnrollsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUsecase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  ({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest) => Promise<SendNotificationUseCaseResponse>
>

describe('On Enroll Created', () => {
  beforeEach(() => {
    inMemoryLessonAttachmentsRepository =
      new InMemoryLessonAttachmentsRepository()
    inMemoryLessonsRepository = new InMemoryLessonsRepository(
      inMemoryLessonAttachmentsRepository,
    )
    inMemoryEnrollsRepository = new InMemoryEnrollsRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUsecase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUsecase, 'execute')

    // eslint-disable-next-line no-new
    new OnEnrollCreated(inMemoryLessonsRepository, sendNotificationUsecase)
  })

  it('should send a notification when an enroll is created', async () => {
    const lesson = makeLesson()
    const enroll = makeEnroll({
      lessonId: lesson.id,
    })

    inMemoryLessonsRepository.create(lesson)
    inMemoryEnrollsRepository.create(enroll)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
