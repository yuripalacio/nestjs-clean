import { LessonsRepository } from '../repositories/lessons-repository'
import { Lesson } from '../../enterprise/entities/lesson'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchRecentLessonsUseCaseRequest {
  page: number
}

type FetchRecentLessonsUseCaseResponse = Either<
  null,
  {
    lessons: Lesson[]
  }
>

@Injectable()
export class FetchRecentLessonsUseCase {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute({
    page,
  }: FetchRecentLessonsUseCaseRequest): Promise<FetchRecentLessonsUseCaseResponse> {
    const lessons = await this.lessonsRepository.findManyRecent({
      page,
    })

    return right({
      lessons,
    })
  }
}
