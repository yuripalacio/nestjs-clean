import { InMemoryLessonsRepository } from 'test/repositories/in-memory-lessons-repository'
import { makeLesson } from 'test/factories/make-lesson'
import { EditLessonUseCase } from './edit-lesson'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryLessonAttachmentsRepository } from 'test/repositories/in-memory-lesson-attachments-repository'
import { makeLessonAttachment } from 'test/factories/make-lesson-attachment'

let inMemoryLessonsRepository: InMemoryLessonsRepository
let inMemoryLessonAttachmentsRepository: InMemoryLessonAttachmentsRepository
let sut: EditLessonUseCase

describe('Edit lesson', () => {
  beforeEach(() => {
    inMemoryLessonAttachmentsRepository =
      new InMemoryLessonAttachmentsRepository()
    inMemoryLessonsRepository = new InMemoryLessonsRepository(
      inMemoryLessonAttachmentsRepository,
    )
    sut = new EditLessonUseCase(
      inMemoryLessonsRepository,
      inMemoryLessonAttachmentsRepository,
    )
  })

  it('should be able to edit a lesson', async () => {
    const newLesson = makeLesson(
      {
        title: 'Old Title',
        content: 'Old content',
      },
      new UniqueEntityId('1'),
    )

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
      title: 'New title',
      content: 'New content',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryLessonsRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    })
    expect(
      inMemoryLessonsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryLessonsRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
      ],
    )
  })
})
