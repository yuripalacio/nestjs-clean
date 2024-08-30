import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Enroll } from '../../enterprise/entities/enroll'
import { EnrollsRepository } from '../repositories/enrolls-repository'
import { Either, right } from '@/core/either'

interface EnrollClassUseCaseRequest {
  studentId: string
  lessonId: string
}

type EnrollClassUserCaseResponse = Either<
  null,
  {
    enroll: Enroll
  }
>

export class EnrollClassUseCase {
  constructor(private enrollsRepository: EnrollsRepository) {}

  async execute({
    lessonId,
    studentId,
  }: EnrollClassUseCaseRequest): Promise<EnrollClassUserCaseResponse> {
    const enroll = Enroll.create({
      lessonId: new UniqueEntityId(lessonId),
      studentId: new UniqueEntityId(studentId),
    })

    await this.enrollsRepository.create(enroll)

    return right({
      enroll,
    })
  }
}
