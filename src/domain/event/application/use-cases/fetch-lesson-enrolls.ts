import { EnrollsRepository } from '../repositories/enrolls-repository'
import { Enroll } from '../../enterprise/entities/enroll'
import { Either, right } from '@/core/either'

interface FeetchLessonEnrollsUseCaseRequest {
  lessonId: string
  page: number
}

type FeetchLessonEnrollsUseCaseResponse = Either<
  null,
  {
    enrolls: Enroll[]
  }
>

export class FeetchLessonEnrollsUseCase {
  constructor(private enrollsRepository: EnrollsRepository) {}

  async execute({
    lessonId,
    page,
  }: FeetchLessonEnrollsUseCaseRequest): Promise<FeetchLessonEnrollsUseCaseResponse> {
    const enrolls = await this.enrollsRepository.findManyByLessonId(lessonId, {
      page,
    })

    return right({
      enrolls,
    })
  }
}
