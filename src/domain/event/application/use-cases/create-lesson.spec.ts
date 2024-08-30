import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CreateLessonUseCase } from './create-lesson'
import { InMemoryLessonsRepository } from 'test/repositories/in-memory-lessons-repository'
import { InMemoryLessonAttachmentsRepository } from 'test/repositories/in-memory-lesson-attachments-repository'

let inMemoryLessonsRepository: InMemoryLessonsRepository
let inMemoryLessonAttachmentsRepository: InMemoryLessonAttachmentsRepository
let sut: CreateLessonUseCase

describe('Create Lesson', () => {
  beforeEach(() => {
    inMemoryLessonAttachmentsRepository =
      new InMemoryLessonAttachmentsRepository()
    inMemoryLessonsRepository = new InMemoryLessonsRepository(
      inMemoryLessonAttachmentsRepository,
    )
    sut = new CreateLessonUseCase(inMemoryLessonsRepository)
  })

  it('should be able to create a lesson', async () => {
    const result = await sut.execute({
      content: 'Fake content',
      title: 'Fake title',
      teacherId: '1',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryLessonsRepository.items[0]).toEqual(result.value?.lesson)
    expect(
      inMemoryLessonsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryLessonsRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
      ],
    )
  })
})
