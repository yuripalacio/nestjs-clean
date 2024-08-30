import { InMemoryEnrollsRepository } from 'test/repositories/in-memory-enrolls-repository'
import { makeEnroll } from 'test/factories/make-enroll'
import { DeleteEnrollUseCase } from './delete-enroll'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryEnrollsRepository: InMemoryEnrollsRepository
let sut: DeleteEnrollUseCase

describe('Delete enroll', () => {
  beforeEach(() => {
    inMemoryEnrollsRepository = new InMemoryEnrollsRepository()
    sut = new DeleteEnrollUseCase(inMemoryEnrollsRepository)
  })

  it('should be able to delete a enroll', async () => {
    const newEnroll = makeEnroll(
      {
        studentId: new UniqueEntityId('1'),
      },
      new UniqueEntityId('1'),
    )

    await inMemoryEnrollsRepository.create(newEnroll)

    await sut.execute({
      enrollId: '1',
      studentId: '1',
    })

    expect(inMemoryEnrollsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an enroll from another user', async () => {
    const newEnroll = makeEnroll(
      {
        studentId: new UniqueEntityId('1'),
      },
      new UniqueEntityId('1'),
    )

    await inMemoryEnrollsRepository.create(newEnroll)

    const result = await sut.execute({
      enrollId: '1',
      studentId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
