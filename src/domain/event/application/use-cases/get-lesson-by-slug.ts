import { LessonsRepository } from '../repositories/lessons-repository'
import { Lesson } from '../../enterprise/entities/lesson'
import { Either, right } from '@/core/either'

interface GetLessonBySlugUseCaseRequest {
  slug: string
}

type GetLessonBySlugUseCaseResponse = Either<
  null,
  {
    lesson: Lesson
  }
>

export class GetLessonBySlugUseCase {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute({
    slug,
  }: GetLessonBySlugUseCaseRequest): Promise<GetLessonBySlugUseCaseResponse> {
    const lesson = await this.lessonsRepository.findBySlug(slug)

    if (!lesson) {
      throw new Error('Not found')
    }

    return right({
      lesson,
    })
  }
}
