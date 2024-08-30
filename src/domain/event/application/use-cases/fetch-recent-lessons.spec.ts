import { InMemoryLessonsRepository } from 'test/repositories/in-memory-lessons-repository'
import { FetchRecentLessonsUseCase } from './fetch-recent-lessons'
import { makeLesson } from 'test/factories/make-lesson'
import { InMemoryLessonAttachmentsRepository } from 'test/repositories/in-memory-lesson-attachments-repository'

let inMemoryLessonAttachmentsRepository: InMemoryLessonAttachmentsRepository
let inMemoryLessonsRepository: InMemoryLessonsRepository
let sut: FetchRecentLessonsUseCase

describe('Fetch Recent Lessons', () => {
  beforeEach(() => {
    inMemoryLessonAttachmentsRepository =
      new InMemoryLessonAttachmentsRepository()
    inMemoryLessonsRepository = new InMemoryLessonsRepository(
      inMemoryLessonAttachmentsRepository,
    )
    sut = new FetchRecentLessonsUseCase(inMemoryLessonsRepository)
  })

  it('should be able to fetch lessons', async () => {
    await inMemoryLessonsRepository.create(
      makeLesson({ createdAt: new Date(2024, 0, 20) }),
    )
    await inMemoryLessonsRepository.create(
      makeLesson({ createdAt: new Date(2024, 0, 14) }),
    )
    await inMemoryLessonsRepository.create(
      makeLesson({ createdAt: new Date(2024, 0, 18) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.lessons).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 18) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 14) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryLessonsRepository.create(
        makeLesson({ createdAt: new Date(2024, 0, i) }),
      )
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.lessons).toHaveLength(2)
  })
})
