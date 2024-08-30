import { EnrollClassUseCase } from './enroll-class'
import { InMemoryEnrollsRepository } from 'test/repositories/in-memory-enrolls-repository'

let inMemoryEnrollsRepository: InMemoryEnrollsRepository
let sut: EnrollClassUseCase

describe('Create Enroll', () => {
  beforeEach(() => {
    inMemoryEnrollsRepository = new InMemoryEnrollsRepository()
    sut = new EnrollClassUseCase(inMemoryEnrollsRepository)
  })

  it('should be able to enroll into lesson', async () => {
    const result = await sut.execute({
      lessonId: '1',
      studentId: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryEnrollsRepository.items[0]).toEqual(result.value?.enroll)
  })
})
