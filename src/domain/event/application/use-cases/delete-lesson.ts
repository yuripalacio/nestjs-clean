import { Either, left, right } from '@/core/either'
import { LessonsRepository } from '../repositories/lessons-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface DeleteLessonUseCaseRequest {
  lessonId: string
}

type DeleteLessonUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>

export class DeleteLessonUseCase {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute({
    lessonId,
  }: DeleteLessonUseCaseRequest): Promise<DeleteLessonUseCaseResponse> {
    const lesson = await this.lessonsRepository.findById(lessonId)

    if (!lesson) {
      return left(new ResourceNotFoundError())
    }

    await this.lessonsRepository.delete(lesson)

    return right(null)
  }
}
