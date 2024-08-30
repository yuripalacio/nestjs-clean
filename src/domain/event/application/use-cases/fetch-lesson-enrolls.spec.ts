import { InMemoryEnrollsRepository } from 'test/repositories/in-memory-enrolls-repository'
import { FeetchLessonEnrollsUseCase } from './fetch-lesson-enrolls'
import { makeEnroll } from 'test/factories/make-enroll'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryEnrollsRepository: InMemoryEnrollsRepository
let sut: FeetchLessonEnrollsUseCase

describe('Fetch Lesson Enrolls', () => {
  beforeEach(() => {
    inMemoryEnrollsRepository = new InMemoryEnrollsRepository()
    sut = new FeetchLessonEnrollsUseCase(inMemoryEnrollsRepository)
  })

  it('should be able to fetch lesson enrolls', async () => {
    await inMemoryEnrollsRepository.create(
      makeEnroll({ lessonId: new UniqueEntityId('1') }),
    )
    await inMemoryEnrollsRepository.create(
      makeEnroll({ lessonId: new UniqueEntityId('1') }),
    )
    await inMemoryEnrollsRepository.create(
      makeEnroll({ lessonId: new UniqueEntityId('2') }),
    )

    const result = await sut.execute({
      lessonId: '1',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.enrolls).toHaveLength(2)
  })

  it('should be able to fetch paginated lesson enrolls', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryEnrollsRepository.create(
        makeEnroll({ lessonId: new UniqueEntityId('2') }),
      )
    }

    const result = await sut.execute({
      lessonId: '2',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.enrolls).toHaveLength(2)
  })
})
