import { InMemoryLessonsRepository } from 'test/repositories/in-memory-lessons-repository'
import { makeLesson } from 'test/factories/make-lesson'
import { DeleteLessonUseCase } from './delete-lesson'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryLessonAttachmentsRepository } from 'test/repositories/in-memory-lesson-attachments-repository'
import { makeLessonAttachment } from 'test/factories/make-lesson-attachment'

let inMemoryLessonsRepository: InMemoryLessonsRepository
let inMemoryLessonAttachmentsRepository: InMemoryLessonAttachmentsRepository
let sut: DeleteLessonUseCase

describe('Delete lesson', () => {
  beforeEach(() => {
    inMemoryLessonAttachmentsRepository =
      new InMemoryLessonAttachmentsRepository()
    inMemoryLessonsRepository = new InMemoryLessonsRepository(
      inMemoryLessonAttachmentsRepository,
    )

    sut = new DeleteLessonUseCase(inMemoryLessonsRepository)
  })

  it('should be able to delete a lesson', async () => {
    const newLesson = makeLesson({}, new UniqueEntityId('1'))

    await inMemoryLessonsRepository.create(newLesson)

    inMemoryLessonAttachmentsRepository.items.push(
      makeLessonAttachment({
        lessonId: newLesson.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeLessonAttachment({
        lessonId: newLesson.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      lessonId: '1',
    })

    expect(inMemoryLessonsRepository.items).toHaveLength(0)
    expect(inMemoryLessonAttachmentsRepository.items).toHaveLength(0)
  })
})
