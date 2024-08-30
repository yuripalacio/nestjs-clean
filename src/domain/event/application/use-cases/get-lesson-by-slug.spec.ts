import { InMemoryLessonsRepository } from 'test/repositories/in-memory-lessons-repository'
import { GetLessonBySlugUseCase } from './get-lesson-by-slug'
import { makeLesson } from 'test/factories/make-lesson'
import { InMemoryLessonAttachmentsRepository } from 'test/repositories/in-memory-lesson-attachments-repository'

let inMemoryLessonAttachmentsRepository: InMemoryLessonAttachmentsRepository
let inMemoryLessonsRepository: InMemoryLessonsRepository
let sut: GetLessonBySlugUseCase

describe('Get Question By Slyg', () => {
  beforeEach(() => {
    inMemoryLessonAttachmentsRepository =
      new InMemoryLessonAttachmentsRepository()
    inMemoryLessonsRepository = new InMemoryLessonsRepository(
      inMemoryLessonAttachmentsRepository,
    )
    sut = new GetLessonBySlugUseCase(inMemoryLessonsRepository)
  })

  it('should be able to get a lesson by slug', async () => {
    const newLesson = makeLesson({
      title: 'Fake slug',
    })

    await inMemoryLessonsRepository.create(newLesson)

    const result = await sut.execute({
      slug: 'fake-slug',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryLessonsRepository.items[0]).toEqual(result.value?.lesson)
  })
})
